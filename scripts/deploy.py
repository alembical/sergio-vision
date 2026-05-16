"""
deploy.py — push sergio-vision to GitHub and deploy it to Coolify OG.

Reads COOLIFY_OG_URL, COOLIFY_OG_API_KEY, and CLOUDFLARE_API_TOKEN from
c:/Alembical/imperium/.env.local internally. Tokens are NEVER echoed.

GitHub side uses the gh CLI (already authed as alex-osti) so no token
ever appears in chat or on disk outside the keyring.

Steps:
  1. Ensure GitHub repo alex-osti/sergio-vision exists (public), with master pushed.
  2. Discover a Coolify OG project + server.
  3. Create a public-repo Coolify application pointed at the GitHub repo
     with Dockerfile build pack, FQDN sergio-vision.makertoo.win.
  4. Ensure Cloudflare DNS for sergio-vision.makertoo.win exists, proxied.
  5. Trigger deploy. Print the public URL.

Idempotent — safe to re-run.

Run:  python c:/Alembical/sergio-vision/scripts/deploy.py
"""

import json
import re
import ssl
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

IMPERIUM_ENV = Path("c:/Alembical/imperium/.env.local")
REPO_DIR = Path("c:/Alembical/sergio-vision")
GH_REPO = "sergio-vision"
GH_BRANCH = "master"
FQDN = "sergio-vision.makertoo.win"
DOMAIN = "makertoo.win"
SUBDOMAIN = "sergio-vision"

REQUIRED_ENV = ["COOLIFY_OG_URL", "COOLIFY_OG_API_KEY", "CLOUDFLARE_API_TOKEN"]


# ─── env file (token values stay in dict, never printed) ───────────────────────

def parse_env(path: Path) -> dict[str, str]:
    if not path.exists():
        sys.exit(f"ERROR: {path} not found")
    text = path.read_text(encoding="utf-8")
    out: dict[str, str] = {}
    for m in re.finditer(r"^([A-Z_][A-Z0-9_]*)=(.*?)\s*$", text, re.MULTILINE):
        k, v = m.group(1), m.group(2)
        if v and len(v) >= 2 and v[0] == v[-1] and v[0] in '"\'':
            v = v[1:-1]
        if v:
            out[k] = v
    return out


# ─── HTTP helpers — tokens passed via headers, never logged ────────────────────

def http_json(method: str, url: str, headers: dict[str, str], body=None, timeout: int = 30):
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
        headers = {**headers, "Content-Type": "application/json"}
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ssl.create_default_context()) as r:
            raw = r.read().decode("utf-8")
            try:
                return r.status, json.loads(raw)
            except json.JSONDecodeError:
                return r.status, raw
    except urllib.error.HTTPError as e:
        body_text = ""
        try:
            body_text = e.read().decode("utf-8", errors="replace")[:600]
        except Exception:
            pass
        return e.code, body_text
    except urllib.error.URLError as e:
        return 0, str(e.reason)


def coolify(method: str, path: str, token: str, base: str, body=None):
    url = f"{base.rstrip('/')}/api/v1/{path.lstrip('/')}"
    return http_json(method, url, {"Authorization": f"Bearer {token}", "Accept": "application/json"}, body)


def cloudflare(method: str, path: str, token: str, body=None):
    url = f"https://api.cloudflare.com/client/v4/{path.lstrip('/')}"
    return http_json(method, url, {"Authorization": f"Bearer {token}"}, body)


# ─── GitHub via gh CLI (no token surface) ──────────────────────────────────────

def run(cmd: list[str], cwd: Path | None = None, check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, check=check)


def ensure_github_repo() -> str:
    """Return https git URL of the repo. Create + push if missing."""
    who = subprocess.run(["gh", "api", "user", "--jq", ".login"], capture_output=True, text=True)
    if who.returncode != 0 or not who.stdout.strip():
        sys.exit(f"[gh] could not resolve current user: {who.stderr}")
    owner = who.stdout.strip()
    print(f"[gh] authed as {owner}; checking {owner}/{GH_REPO}…")
    r = subprocess.run(
        ["gh", "repo", "view", f"{owner}/{GH_REPO}", "--json", "url,visibility"],
        capture_output=True, text=True
    )
    repo_url = f"https://github.com/{owner}/{GH_REPO}.git"
    if r.returncode == 0:
        info = json.loads(r.stdout)
        print(f"[gh] repo exists, visibility={info.get('visibility', '?').lower()}")
    else:
        if "Could not resolve" not in (r.stderr or "") and "not found" not in (r.stderr or "").lower():
            # Some other error
            print(f"[gh] view returned non-zero ({r.returncode}); attempting create anyway")
        print(f"[gh] creating PUBLIC repo {owner}/{GH_REPO} (Coolify needs public for unauthenticated clone)")
        c = subprocess.run(
            ["gh", "repo", "create", f"{owner}/{GH_REPO}", "--public",
             "--description", "Sergio Djurdjevic presentation pitch (private link, public source)",
             "--source", str(REPO_DIR), "--remote", "origin", "--push"],
            capture_output=True, text=True
        )
        if c.returncode != 0:
            sys.exit(f"[gh] create failed:\n{c.stderr}")
        print(f"[gh] created and pushed {GH_BRANCH}")
        return repo_url

    # Repo exists. Ensure 'origin' is set and push.
    remotes = run(["git", "remote"], cwd=REPO_DIR, check=False).stdout.split()
    if "origin" not in remotes:
        print("[git] adding remote origin")
        run(["git", "remote", "add", "origin", repo_url], cwd=REPO_DIR)
    else:
        # Make sure it points where we expect
        cur = run(["git", "remote", "get-url", "origin"], cwd=REPO_DIR).stdout.strip()
        if cur != repo_url:
            print(f"[git] updating origin -> {repo_url}")
            run(["git", "remote", "set-url", "origin", repo_url], cwd=REPO_DIR)
    print(f"[git] pushing {GH_BRANCH} to origin")
    p = subprocess.run(["git", "push", "-u", "origin", GH_BRANCH], cwd=REPO_DIR, capture_output=True, text=True)
    if p.returncode != 0:
        sys.exit(f"[git] push failed:\n{p.stderr}")
    return repo_url


# ─── Coolify ───────────────────────────────────────────────────────────────────

def pick_project_and_server(token: str, base: str) -> tuple[str, str, str, str]:
    """Returns (project_uuid, server_uuid, environment_name, destination_uuid)."""
    print("[coolify] listing projects…")
    code, projects = coolify("GET", "projects", token, base)
    if code != 200 or not isinstance(projects, list):
        sys.exit(f"[coolify] projects list failed ({code}): {projects!r}")
    if not projects:
        sys.exit("[coolify] no projects found")
    preferred = None
    for p in projects:
        name = (p.get("name") or "").lower()
        if "sites" in name or "test" in name:
            preferred = p
            break
    if not preferred:
        for p in projects:
            name = (p.get("name") or "").lower()
            if any(k in name for k in ["presentation", "pitch", "brand", "makertoo", "default", "production"]):
                preferred = p
                break
    project = preferred or projects[0]
    project_uuid = project["uuid"]
    print(f"[coolify] using project: {project.get('name')} ({project_uuid})")

    print("[coolify] listing servers…")
    code, servers = coolify("GET", "servers", token, base)
    if code != 200 or not isinstance(servers, list):
        sys.exit(f"[coolify] servers list failed ({code}): {servers!r}")
    reachable = [s for s in servers if not s.get("is_build_server", False)]
    if not reachable:
        sys.exit("[coolify] no application servers found")
    server = reachable[0]
    server_uuid = server["uuid"]
    print(f"[coolify] using server: {server.get('name')} ({server_uuid})")

    # Destination — read it off any existing application on the same server
    print("[coolify] discovering destination network…")
    code, apps = coolify("GET", "applications", token, base)
    destination_uuid = None
    if code == 200 and isinstance(apps, list):
        for app in apps:
            d = (app.get("destination") or {})
            if d.get("uuid"):
                # Pull the app detail to confirm it lives on this server
                code2, full = coolify("GET", f"applications/{app['uuid']}", token, base)
                if code2 == 200 and isinstance(full, dict):
                    d2 = full.get("destination") or {}
                    srv = (d2.get("server") or {}).get("uuid")
                    if srv == server_uuid and d2.get("uuid"):
                        destination_uuid = d2["uuid"]
                        print(f"[coolify] destination network: {d2.get('name')} ({destination_uuid})")
                        break
    if not destination_uuid:
        sys.exit("[coolify] could not discover a destination uuid — create one in the UI first")

    env_name = "production"
    return project_uuid, server_uuid, env_name, destination_uuid


def find_existing_app(token: str, base: str, repo_url: str) -> dict | None:
    code, apps = coolify("GET", "applications", token, base)
    if code != 200 or not isinstance(apps, list):
        return None
    repo_path = repo_url.replace("https://github.com/", "").replace(".git", "")
    for a in apps:
        if a.get("name") == GH_REPO or a.get("git_repository", "").endswith(repo_path) or (a.get("fqdn") or "").rstrip("/") == f"https://{FQDN}":
            return a
    return None


def create_app(token: str, base: str, project_uuid: str, server_uuid: str, env_name: str, destination_uuid: str, repo_url: str) -> str:
    body = {
        "name": GH_REPO,
        "project_uuid": project_uuid,
        "server_uuid": server_uuid,
        "destination_uuid": destination_uuid,
        "environment_name": env_name,
        "git_repository": repo_url,
        "git_branch": GH_BRANCH,
        "build_pack": "dockerfile",
        "ports_exposes": "80",
        "dockerfile_location": "/Dockerfile",
        "domains": f"https://{FQDN}",
        "instant_deploy": False,
    }
    print(f"[coolify] creating application…")
    code, resp = coolify("POST", "applications/public", token, base, body)
    if code not in (200, 201):
        sys.exit(f"[coolify] create failed ({code}): {resp!r}")
    app_uuid = (resp or {}).get("uuid") if isinstance(resp, dict) else None
    if not app_uuid:
        sys.exit(f"[coolify] unexpected create response: {resp!r}")
    print(f"[coolify] created application uuid={app_uuid}")
    return app_uuid


def ensure_fqdn(token: str, base: str, app_uuid: str) -> None:
    print(f"[coolify] ensuring fqdn https://{FQDN}")
    code, _ = coolify("PATCH", f"applications/{app_uuid}", token, base, {"domains": f"https://{FQDN}"})
    if code not in (200, 201, 204):
        print(f"[coolify] fqdn patch returned {code} — continuing")


def trigger_deploy(token: str, base: str, app_uuid: str) -> None:
    print(f"[coolify] triggering deploy…")
    url = f"{base.rstrip('/')}/api/v1/deploy?uuid={app_uuid}&force=false"
    code, resp = http_json("GET", url, {"Authorization": f"Bearer {token}", "Accept": "application/json"})
    if code not in (200, 201, 202):
        sys.exit(f"[coolify] deploy trigger failed ({code}): {resp!r}")
    print(f"[coolify] deploy queued")


# ─── Cloudflare DNS ────────────────────────────────────────────────────────────

def get_server_ip_from_existing(cf_token: str, zone_id: str) -> str | None:
    """Look up an existing record on makertoo.win to copy the server IP from."""
    for candidate in ["amstelbay", "sergios-mockup", "klinik-alarm", "hub"]:
        code, resp = cloudflare("GET", f"zones/{zone_id}/dns_records?type=A&name={candidate}.{DOMAIN}", cf_token)
        if code == 200 and isinstance(resp, dict) and resp.get("result"):
            ip = resp["result"][0].get("content")
            if ip:
                print(f"[cloudflare] copying server IP from {candidate}.{DOMAIN}")
                return ip
    return None


def ensure_dns(cf_token: str) -> None:
    print(f"[cloudflare] checking DNS for {FQDN}")
    code, resp = cloudflare("GET", f"zones?name={DOMAIN}", cf_token)
    if code != 200 or not isinstance(resp, dict) or not resp.get("result"):
        sys.exit(f"[cloudflare] zone lookup failed ({code}): {resp!r}")
    zone_id = resp["result"][0]["id"]
    code, resp = cloudflare("GET", f"zones/{zone_id}/dns_records?name={FQDN}", cf_token)
    if code == 200 and isinstance(resp, dict) and resp.get("result"):
        print(f"[cloudflare] DNS already exists for {FQDN}")
        return
    ip = get_server_ip_from_existing(cf_token, zone_id)
    if not ip:
        print(f"[cloudflare] no existing A record to copy IP from — skipping DNS creation")
        print(f"[cloudflare] add this manually: A {SUBDOMAIN} -> <server IP>, proxied")
        return
    body = {"type": "A", "name": SUBDOMAIN, "content": ip, "ttl": 1, "proxied": True}
    code, resp = cloudflare("POST", f"zones/{zone_id}/dns_records", cf_token, body)
    if code in (200, 201):
        print(f"[cloudflare] created A {FQDN} -> (proxied)")
    else:
        print(f"[cloudflare] DNS create returned {code}: {resp!r}")


# ─── main ──────────────────────────────────────────────────────────────────────

def main():
    env = parse_env(IMPERIUM_ENV)
    missing = [k for k in REQUIRED_ENV if k not in env]
    if missing:
        sys.exit(f"ERROR: missing keys in {IMPERIUM_ENV}: {missing}")
    coolify_url = env["COOLIFY_OG_URL"]
    coolify_token = env["COOLIFY_OG_API_KEY"]
    cf_token = env["CLOUDFLARE_API_TOKEN"]

    print("=" * 60)
    print(f"sergio-vision deploy -> {FQDN}")
    print("=" * 60)

    repo_url = ensure_github_repo()

    existing = find_existing_app(coolify_token, coolify_url, repo_url)
    if existing:
        app_uuid = existing["uuid"]
        print(f"[coolify] application already exists uuid={app_uuid}")
        ensure_fqdn(coolify_token, coolify_url, app_uuid)
    else:
        project_uuid, server_uuid, env_name, destination_uuid = pick_project_and_server(coolify_token, coolify_url)
        app_uuid = create_app(coolify_token, coolify_url, project_uuid, server_uuid, env_name, destination_uuid, repo_url)

    ensure_dns(cf_token)
    trigger_deploy(coolify_token, coolify_url, app_uuid)

    print()
    print("=" * 60)
    print(f"Deploy queued. Build takes ~3-5 minutes.")
    print(f"Public URL: https://{FQDN}")
    print(f"Coolify app UUID: {app_uuid}")
    print("=" * 60)


if __name__ == "__main__":
    main()

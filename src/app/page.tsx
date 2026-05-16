import FloatingNav from "@/components/FloatingNav";
import ScrollProgress from "@/components/ScrollProgress";
import Cover from "@/components/Cover";
import SajtJeTu from "@/components/SajtJeTu";
import Bridge from "@/components/Bridge";
import Moduli from "@/components/Moduli";
import SledeciKorak from "@/components/SledeciKorak";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <main className="w-full relative selection:bg-oranje selection:text-obsidian antialiased">
      <ScrollProgress />
      <FloatingNav />
      <Cover />
      <SajtJeTu />
      <Bridge />
      <Moduli />
      <SledeciKorak />
      <Cta />
    </main>
  );
}

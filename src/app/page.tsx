import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import PhaseOne from "@/components/PhaseOne";
import OmniChannel from "@/components/OmniChannel";
import AwareSystem from "@/components/AwareSystem";
import FranchiseGrid from "@/components/FranchiseGrid";
import RoadmapFooter from "@/components/RoadmapFooter";

export default function Home() {
  return (
    <main className="w-full relative selection:bg-oranje selection:text-obsidian antialiased">
      <FloatingNav />
      <Hero />
      <Philosophy />
      <PhaseOne />
      <OmniChannel />
      <AwareSystem />
      <FranchiseGrid />
      <RoadmapFooter />
    </main>
  );
}

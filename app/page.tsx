import BestSeller from "./components/home-components/BestSeller";
import TwoColumnGrid from "./components/home-components/TwoColumnGrid";

export default function Home() {
  return (
    <main className="bg-primary-50 px-20 py-10 flex flex-col gap-16">
      <TwoColumnGrid />
      <BestSeller />
    </main>
  );
}

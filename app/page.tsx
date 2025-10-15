import BestSeller from "./components/home-components/BestSeller";
import CategoryStrip from "./components/home-components/CategoryStrip";
import TwoColumnGrid from "./components/home-components/TwoColumnGrid";

export default function Home() {
  return (
    <main className="md:px-20 px-6 mb-6  flex flex-col gap-10 md:gap-4">
      <TwoColumnGrid />
      <CategoryStrip />
      <BestSeller title="Best Seller" />
    </main>
  );
}

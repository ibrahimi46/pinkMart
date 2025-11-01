import BestSeller from "./components/home-components/BestSeller";
import CategoryStrip from "./components/home-components/CategoryStrip";
import TwoColumnGrid from "./components/home-components/TwoColumnGrid";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );

  const categories = await res.json();

  return (
    <main className="md:px-20 px-6 mb-6 flex flex-col gap-12 md:gap-">
      <TwoColumnGrid />
      <CategoryStrip categories={categories} />
      <BestSeller title="Best Seller" withBorder={false} />
    </main>
  );
}

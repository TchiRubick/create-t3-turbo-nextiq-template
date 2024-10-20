import { CardsPrice } from "../_components/cards-price";
import { HeroSection } from "./_components/hero-section";

const HomePage = () => {
  return (
    <main className="flex-1">
      <HeroSection />
      <CardsPrice />
    </main>
  );
};

export default HomePage;

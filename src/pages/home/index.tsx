import Count from "./Count";
import Doctor from "./Doctor";
import HeroSection from "./Hero";
import Services from "./Services";
import WhyUs from "./WhyUs";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main id="main">
        <WhyUs />
        <Count />
        <Doctor />
        <Services />
      </main>
    </>
  );
}

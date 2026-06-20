import Banner from "@/components/banner";
import WhyChooseSection from "@/components/WhyChooseSection";
import ChoosePlotSection from "@/components/ChoosePlotSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import InvestmentAndProcessSection from "@/components/InvestmentAndProcessSection";
import LocationAndGallerySection from "@/components/LocationAndGallerySection";

export default function Home() {
  return (
    <>
      <Banner />
      <WhyChooseSection />
      <ChoosePlotSection />
      <AmenitiesSection />
      <InvestmentAndProcessSection />
      <LocationAndGallerySection />
    </>
  );
}
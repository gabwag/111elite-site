import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VehicleSpotlight from "@/components/VehicleSpotlight";
import ServicesSection from "@/components/ServicesSection";
import WhoWeAre from "@/components/WhoWeAre";
import WhyChooseUs from "@/components/WhyChooseUs";
import LocationMap from "@/components/LocationMap";
import ContactFooter from "@/components/ContactFooter";


const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <VehicleSpotlight />
      <ServicesSection />
      <WhoWeAre />
      <WhyChooseUs />
      <LocationMap />
      <ContactFooter />
      
    </main>
  );
};

export default Index;

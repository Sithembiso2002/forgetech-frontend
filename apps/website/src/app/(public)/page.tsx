import Hero from "@/features/home/Hero";
import IndustriesSection from "@/features/home/IndustriesSection";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import Process from "@/features/home/Process";
import FeaturedProjects from "@/features/home/FeaturedProjects";
import CTA from "@/features/home/CTA";
import NewsSection from "@/features/home/NewsSection";
import ContactSection from "@/features/home/ContactSection";
import AboutCard from "@/features/home/AboutCard";
import ServicesSection from "@/features/home/ServicesSection";   // ← new import
import NewsletterSection from "@/features/home/NewsletterSection";
import FAQSection from "@/features/home/FAQSection";
import SolutionCardsSection from "@/features/home/SolutionCardsSection";
import PartnersCarousel from "@/features/home/PartnersCarousel";
import ServicesAdSlider from "@/features/home/ServicesAdSlider";
import CaseStudiesSection from "@/features/home/CaseStudiesSection";



  

export default async function HomePage() {
  
  return (
    <>
      <Hero />
      <PartnersCarousel />
      <ServicesAdSlider />
      <Process />
      <AboutCard />
      <NewsSection />
      <ServicesSection />
      <IndustriesSection/> 
      <SolutionCardsSection />
      <CaseStudiesSection />
      <WhyChooseUs />
      <CTA />
      <FeaturedProjects />
      <FAQSection />
      <NewsletterSection />
      <ContactSection />
    </>
  );
}
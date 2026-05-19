import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedFiles } from "@/components/home/FeaturedFiles";
import { Categories } from "@/components/home/Categories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedFiles />
      <Categories />
      <HowItWorks />
      <CTA />
    </>
  );
}

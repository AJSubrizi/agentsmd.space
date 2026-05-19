import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedFiles } from "@/components/home/FeaturedFiles";
import { Categories } from "@/components/home/Categories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CTA } from "@/components/home/CTA";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://agentsmd.space/#website",
      url: "https://agentsmd.space",
      name: "Agents",
      description:
        "Community-curated directory of AGENTS.md and CLAUDE.md instruction files for AI coding agents.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://agentsmd.space/files?q={query}",
        "query-input": "required name=query",
      },
    },
    {
      "@type": "CollectionPage",
      "@id": "https://agentsmd.space/#collection",
      url: "https://agentsmd.space",
      name: "AGENTS.md and CLAUDE.md directory",
      isPartOf: { "@id": "https://agentsmd.space/#website" },
      about: ["AGENTS.md", "CLAUDE.md", "AI coding agents"],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Marquee />
      <FeaturedFiles />
      <Categories />
      <HowItWorks />
      <CTA />
    </>
  );
}

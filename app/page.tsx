import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import CertificationSection from "@/components/sections/CertificationSection";
import ContactSection from "@/components/sections/ContactSection";
import ConnectSection from "@/components/sections/ConnectSection";
import AliGPT from "../components/AliGPT";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";

export default function Home() {
  const structuredData = [personJsonLd(), websiteJsonLd()];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificationSection />
      <ContactSection />
      <ConnectSection />
      <AliGPT />
    </>
  );
}

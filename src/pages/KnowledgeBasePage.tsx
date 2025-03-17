import { Navbar } from "@/components/Navbar";
import { KBHero } from "@/components/knowledgebase/KBHero";
import { KBLatestUpdates } from "@/components/knowledgebase/KBLatestUpdates"; 
import { KBResourcesSection } from "@/components/knowledgebase/KBResourcesSection";
import { KBTopResourcesSection } from "@/components/knowledgebase/KBTopResourcesSection";
import { KBHelpSection } from "@/components/knowledgebase/KBHelpSection";
import { ContactSection } from "@/components/ContactSection";

const KnowledgeBasePage = () => {
  return (
    <div className="min-h-screen bg-dark text-white overflow-hidden">
      <Navbar />
      <KBHero />
      <KBLatestUpdates />
      <KBResourcesSection />
      <KBTopResourcesSection />
      <KBHelpSection />
      <ContactSection />
    </div>
  );
};

export default KnowledgeBasePage;

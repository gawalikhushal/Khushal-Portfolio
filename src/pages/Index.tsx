import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { InternationalCertificationsSection } from '@/components/sections/InternationalCertificationsSection';
import { CertificatesSection } from '@/components/sections/CertificatesSection';
import { AchievementsSection } from '@/components/sections/AchievementsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { AdminToggle } from '@/components/AdminToggle';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'international-certifications', 'certificates', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <HeroSection setActiveSection={setActiveSection} isAdminMode={isAdminMode} />
      <AboutSection isAdminMode={isAdminMode} />
      <SkillsSection isAdminMode={isAdminMode} />
      <ProjectsSection isAdminMode={isAdminMode} />
      <EducationSection isAdminMode={isAdminMode} />
      <InternationalCertificationsSection isAdminMode={isAdminMode} />
      <CertificatesSection isAdminMode={isAdminMode} />
      <AchievementsSection isAdminMode={isAdminMode} />
      <ContactSection isAdminMode={isAdminMode} />
      <Footer />
      <AdminToggle isAdminMode={isAdminMode} onAdminModeChange={setIsAdminMode} />
    </div>
  );
};

export default Index;

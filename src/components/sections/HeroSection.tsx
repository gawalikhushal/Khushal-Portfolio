import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { AdminPhotoUpload } from '@/components/AdminPhotoUpload';
import { AdminHeroEditor } from '@/components/admin/AdminHeroEditor';
import profileImage from '@/assets/khushal-profile.jpg';

interface HeroData {
  name: string;
  title: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  hackerrankUrl: string;
  email: string;
}

interface HeroSectionProps {
  setActiveSection: (section: string) => void;
  isAdminMode: boolean;
}

export const HeroSection = ({ setActiveSection, isAdminMode }: HeroSectionProps) => {
  const [currentProfileImage, setCurrentProfileImage] = useState(() => {
    const saved = localStorage.getItem('heroProfileImage');
    return saved || profileImage;
  });
  
  const [heroData, setHeroData] = useState<HeroData>(() => {
    const saved = localStorage.getItem('heroData');
    return saved ? JSON.parse(saved) : {
      name: 'Khushal',
      title: 'Aspiring AI & Data Science Engineer',
      bio: 'Driven by curiosity and a passion for building impactful solutions through AI, web development, and Data Science.',
      githubUrl: 'https://github.com/gawalikhushal',
      linkedinUrl: 'https://linkedin.com/in/gawalikhushal',
      leetcodeUrl: 'https://leetcode.com/u/gawalikhushal',
      hackerrankUrl: 'https://www.hackerrank.com/profile/gawalikhushal26',
      email: 'gawalikhushal26@gmail.com'
    };
  });

  useEffect(() => {
    localStorage.setItem('heroData', JSON.stringify(heroData));
  }, [heroData]);

  useEffect(() => {
    localStorage.setItem('heroProfileImage', currentProfileImage);
  }, [currentProfileImage]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleImageUpdate = (newImageUrl: string) => {
    setCurrentProfileImage(newImageUrl);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-bg">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 4 + 4}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <img
                src={currentProfileImage}
                alt="Khushal Gawali"
                className="w-40 h-40 rounded-full object-cover shadow-glow border-4 border-primary/20 animate-pulse-glow"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 animate-pulse"></div>
              <AdminPhotoUpload
                currentImage={currentProfileImage}
                onImageUpdate={handleImageUpdate}
                isAdminMode={isAdminMode}
              />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {heroData.name}
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-muted-foreground mb-8 font-light">
            {heroData.title}
          </h2>

          {/* Bio */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            {heroData.bio}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={() => scrollToSection('projects')}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-background font-semibold text-lg px-8 py-3 animate-scale-in"
            >
              View Projects
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-background text-lg px-8 py-3 animate-scale-in"
              style={{ animationDelay: '0.2s' }}
            >
              Contact Me
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center flex-wrap gap-4 mb-12">
            <a
              href={heroData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary hover:text-background transition-all duration-300 hover:scale-110"
              title="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={heroData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary hover:text-background transition-all duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={heroData.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary hover:text-background transition-all duration-300 hover:scale-110"
              title="LeetCode"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
              </svg>
            </a>
            <a
              href={heroData.hackerrankUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary hover:text-background transition-all duration-300 hover:scale-110"
              title="HackerRank"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24s-9.75-4.885-10.395-6c-.641-1.115-.641-10.885 0-12C2.25 4.886 10.715 0 12 0zm2.295 6.799c-.141 0-.258.115-.258.258v3.875H9.963V6.799c0-.141-.117-.258-.258-.258H8.82c-.141 0-.258.115-.258.258V17.2c0 .143.117.258.258.258h.885c.141 0 .258-.115.258-.258v-3.875h4.074V17.2c0 .143.115.258.258.258h.885c.141 0 .258-.115.258-.258V6.799c0-.141-.117-.258-.258-.258h-.885z"/>
              </svg>
            </a>
            <a
              href={`mailto:${heroData.email}`}
              className="p-3 rounded-full bg-card hover:bg-primary hover:text-background transition-all duration-300 hover:scale-110"
              title="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* Edit Hero Button for Admin */}
          {isAdminMode && (
            <div className="mb-8">
              <AdminHeroEditor 
                isAdminMode={isAdminMode}
                heroData={heroData}
                onHeroUpdate={setHeroData}
              />
            </div>
          )}

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <button
              onClick={() => scrollToSection('about')}
              className="text-primary hover:text-secondary transition-colors duration-300"
            >
              <ChevronDown className="w-8 h-8 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
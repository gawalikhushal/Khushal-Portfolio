import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AdminAboutEditor } from '@/components/admin/AdminAboutEditor';
import * as Icons from 'lucide-react';

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

interface AboutData {
  fullName: string;
  bio: string;
  highlights: Highlight[];
}

interface AboutSectionProps {
  isAdminMode: boolean;
}

export const AboutSection = ({ isAdminMode }: AboutSectionProps) => {
  const [aboutData, setAboutData] = useState<AboutData>({
    fullName: 'Gawali Khushal Ramesh',
    bio: "I'm Khushal Gawali, an aspiring AI and Data Science engineer with a passion for technology, innovation, and real-world problem-solving. I'm driven by curiosity and the desire to build impactful solutions—whether it's through machine learning models, full-stack web development, or cybersecurity projects. I love exploring how technology can improve lives and enjoy collaborating with like-minded individuals to bring ideas to life. Outside of coding, I enjoy sharing knowledge through platforms like YouTube and contributing to open-source initiatives.",
    highlights: [
      {
        icon: 'Brain',
        title: "AI & Data Science",
        description: "Passionate about machine learning and data-driven solutions"
      },
      {
        icon: 'Code',
        title: "Full-Stack Development", 
        description: "Building modern web applications with latest technologies"
      },
      {
        icon: 'Shield',
        title: "Cybersecurity",
        description: "Implementing secure systems and best practices"
      },
      {
        icon: 'Users',
        title: "Team Collaboration",
        description: "Working effectively in teams and sharing knowledge"
      }
    ]
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('aboutData');
    if (savedData) {
      try {
        setAboutData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading about data:', error);
      }
    }
  }, []);

  // Save data to localStorage when aboutData changes
  const handleAboutUpdate = (data: AboutData) => {
    setAboutData(data);
    localStorage.setItem('aboutData', JSON.stringify(data));
  };

  return (
    <section id="about" className="py-20 bg-muted/20 relative">
      <AdminAboutEditor 
        isAdminMode={isAdminMode}
        aboutData={aboutData}
        onAboutUpdate={handleAboutUpdate}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Bio Content */}
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-2xl font-bold text-primary">{aboutData.fullName}</h3>
              <div className="prose prose-lg text-muted-foreground">
                <p className="leading-relaxed whitespace-pre-line">
                  {aboutData.bio}
                </p>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {aboutData.highlights.map((highlight, index) => {
                const IconComponent = (Icons as any)[highlight.icon] || Icons.Star;
                return (
                  <Card 
                    key={index} 
                    className="bg-card/80 backdrop-blur-sm border-border hover:bg-card hover:shadow-card transition-all duration-300 hover:-translate-y-2"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-background" />
                      </div>
                      <h4 className="font-semibold mb-2 text-foreground">{highlight.title}</h4>
                      <p className="text-sm text-muted-foreground">{highlight.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
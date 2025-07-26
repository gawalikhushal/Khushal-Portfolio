import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AdminSkillsEditor } from '@/components/admin/AdminSkillsEditor';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  isAdminMode: boolean;
}

export const SkillsSection = ({ isAdminMode }: SkillsSectionProps) => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "Java", level: 80 },
        { name: "C/C++", level: 75 },
        { name: "PHP", level: 70 }
      ]
    },
    {
      category: "Web Development",
      skills: [
        { name: "React.js", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 75 }
      ]
    },
    {
      category: "Data Science & ML",
      skills: [
        { name: "Pandas", level: 90 },
        { name: "NumPy", level: 85 },
        { name: "Scikit-learn", level: 80 },
        { name: "Matplotlib", level: 85 },
        { name: "Data Analysis", level: 88 }
      ]
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "AWS (EC2, S3)", level: 75 },
        { name: "Firebase", level: 80 },
        { name: "VS Code", level: 95 },
        { name: "Docker", level: 65 }
      ]
    }
  ]);

  const [softSkills, setSoftSkills] = useState<string[]>([
    "Problem Solving",
    "Team Collaboration", 
    "Communication",
    "Leadership",
    "Curiosity",
    "Adaptability"
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedSkillCategories = localStorage.getItem('skillsData');
    const savedSoftSkills = localStorage.getItem('softSkillsData');
    
    if (savedSkillCategories) {
      try {
        setSkillCategories(JSON.parse(savedSkillCategories));
      } catch (error) {
        console.error('Error loading skills data:', error);
      }
    }
    
    if (savedSoftSkills) {
      try {
        setSoftSkills(JSON.parse(savedSoftSkills));
      } catch (error) {
        console.error('Error loading soft skills data:', error);
      }
    }
  }, []);

  const handleSkillsUpdate = (categories: SkillCategory[], soft: string[]) => {
    setSkillCategories(categories);
    setSoftSkills(soft);
    localStorage.setItem('skillsData', JSON.stringify(categories));
    localStorage.setItem('softSkillsData', JSON.stringify(soft));
  };

  return (
    <section id="skills" className="py-20 relative">
      <AdminSkillsEditor 
        isAdminMode={isAdminMode}
        skillCategories={skillCategories}
        softSkills={softSkills}
        onSkillsUpdate={handleSkillsUpdate}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A diverse skill set combining technical expertise with strong problem-solving abilities
            </p>
          </div>

          {/* Technical Skills */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <Card 
                key={categoryIndex}
                className="bg-card/80 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl bg-gradient-primary bg-clip-text text-transparent">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                        style={{
                          background: 'hsl(var(--muted))',
                        }}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Soft Skills */}
          <Card className="bg-card/80 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-secondary bg-clip-text text-transparent text-center">
                Soft Skills & Personal Qualities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-4">
                {softSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="px-6 py-3 bg-gradient-primary text-background rounded-full font-medium hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-default"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
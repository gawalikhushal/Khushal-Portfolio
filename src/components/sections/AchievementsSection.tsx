import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Target } from 'lucide-react';
import { AdminAchievementsEditor } from '@/components/admin/AdminAchievementsEditor';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
  category: string;
  icon: string;
}

interface AchievementsSectionProps {
  isAdminMode: boolean;
}

export const AchievementsSection = ({ isAdminMode }: AchievementsSectionProps) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "College Project Competition Winner",
      description: "First place in annual computer science project exhibition for innovative library management system",
      date: "2024",
      category: "Academic",
      icon: "trophy"
    },
    {
      id: 2,
      title: "Best Innovation Award",
      description: "Recognized for developing face recognition attendance system with 99% accuracy",
      date: "2024",
      category: "Innovation",
      icon: "star"
    },
    {
      id: 3,
      title: "Open Source Contributor",
      description: "Active contributor to multiple open source projects with over 100+ commits",
      date: "2023-2024",
      category: "Community",
      icon: "award"
    }
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('achievementsData');
    if (savedData) {
      try {
        setAchievements(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading achievements data:', error);
      }
    }
  }, []);

  // Save data to localStorage when achievements change
  const handleAchievementsUpdate = (data: Achievement[]) => {
    setAchievements(data);
    localStorage.setItem('achievementsData', JSON.stringify(data));
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return Trophy;
      case 'star': return Star;
      case 'award': return Award;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-gradient-primary';
      case 'Innovation': return 'bg-gradient-secondary';
      case 'Community': return 'bg-accent';
      default: return 'bg-primary';
    }
  };

  return (
    <section id="achievements" className="py-20 bg-background relative">
      <AdminAchievementsEditor 
        isAdminMode={isAdminMode}
        achievements={achievements}
        onAchievementsUpdate={handleAchievementsUpdate}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="bg-gradient-primary bg-clip-text text-transparent">Achievements</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Milestones and recognitions that highlight my journey and dedication to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = getIcon(achievement.icon);
              return (
                <Card 
                  key={achievement.id}
                  className="bg-card/80 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-500 hover:-translate-y-4 group animate-fade-in relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg h-48">
                      {achievement.image ? (
                        <img 
                          src={achievement.image} 
                          alt={achievement.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className={`w-full h-full ${getCategoryColor(achievement.category)} flex items-center justify-center`}>
                          <div className="text-white text-center">
                            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                              <IconComponent size={32} />
                            </div>
                            <Badge className="bg-white/90 text-foreground">
                              {achievement.category}
                            </Badge>
                          </div>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-background/90 text-foreground">
                          {achievement.date}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <CardTitle className="mb-3 text-lg group-hover:text-primary transition-colors">
                      {achievement.title}
                    </CardTitle>
                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
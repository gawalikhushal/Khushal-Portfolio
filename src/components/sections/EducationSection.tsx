import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Briefcase, Calendar, MapPin } from 'lucide-react';
import { AdminEducationEditor } from '@/components/admin/AdminEducationEditor';

interface TimelineItem {
  id: number;
  type: 'education' | 'experience';
  title: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  skills: string[];
}

interface EducationSectionProps {
  isAdminMode: boolean;
}

export const EducationSection = ({ isAdminMode }: EducationSectionProps) => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    {
      id: 1,
      type: "education" as const,
      title: "B.E. in AI & Data Science",
      institution: "SNJB's Late Sau. Kantabai Bhavarlalji Jain COE",
      period: "2022 - 2026",
      location: "Maharashtra, India",
      description: "Pursuing Bachelor's degree with focus on Artificial Intelligence, Machine Learning, and Data Science",
      skills: ["Machine Learning", "Data Analysis", "Python Programming", "Statistics"]
    },
    {
      id: 2,
      type: "education" as const, 
      title: "HSC in Computer Science",
      institution: "Rashtriya Vidyalaya Junior College",
      period: "2020 - 2022",
      location: "Maharashtra, India",
      description: "Higher Secondary Certificate with specialization in Computer Science",
      skills: ["Programming Fundamentals", "Mathematics", "Computer Science"]
    },
    {
      id: 3,
      type: "experience" as const,
      title: "Data Science Intern",
      institution: "NeatLeap IT & Training Solutions",
      period: "Jan 2025 - Feb 2025",
      location: "Remote",
      description: "Worked on Exploratory Data Analysis (EDA), ML models, and data visualization using Python",
      skills: ["Python", "Pandas", "Data Visualization", "Machine Learning", "EDA"]
    },
    {
      id: 4,
      type: "experience" as const,
      title: "Android Development Intern", 
      institution: "Google Eduskills India",
      period: "Apr 2024 - Jun 2024",
      location: "Remote",
      description: "Learned Kotlin programming and Android Studio to build mobile applications",
      skills: ["Kotlin", "Android Studio", "Mobile Development", "UI/UX Design"]
    }
  ].sort((a, b) => {
    const yearA = parseInt(a.period.split(' - ')[0]);
    const yearB = parseInt(b.period.split(' - ')[0]);
    return yearB - yearA;
  }));

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('educationData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        const sortedData = parsedData.sort((a: TimelineItem, b: TimelineItem) => {
          const yearA = parseInt(a.period.split(' - ')[0]);
          const yearB = parseInt(b.period.split(' - ')[0]);
          return yearB - yearA;
        });
        setTimelineItems(sortedData);
      } catch (error) {
        console.error('Error loading education data:', error);
      }
    }
  }, []);

  // Save data to localStorage when timeline items change
  const handleTimelineUpdate = (data: TimelineItem[]) => {
    const sortedData = data.sort((a, b) => {
      const yearA = parseInt(a.period.split(' - ')[0]);
      const yearB = parseInt(b.period.split(' - ')[0]);
      return yearB - yearA;
    });
    setTimelineItems(sortedData);
    localStorage.setItem('educationData', JSON.stringify(sortedData));
  };

  return (
    <section id="education" className="py-20 relative">
      <AdminEducationEditor 
        isAdminMode={isAdminMode}
        timelineItems={timelineItems}
        onTimelineUpdate={handleTimelineUpdate}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Education & <span className="bg-gradient-primary bg-clip-text text-transparent">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              My academic journey and professional experiences in technology
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-primary"></div>

            {timelineItems.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } animate-slide-up`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline Icon */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow z-10">
                  {item.type === 'education' ? (
                    <GraduationCap className="w-4 h-4 text-background" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-background" />
                  )}
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                }`}>
                  <Card className="bg-card/80 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge 
                          variant={item.type === 'education' ? 'default' : 'secondary'}
                          className={item.type === 'education' ? 'bg-primary text-background' : 'bg-secondary text-secondary-foreground'}
                        >
                          {item.type === 'education' ? 'Education' : 'Experience'}
                        </Badge>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {item.period}
                          </div>
                          <div className="flex items-center mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
                      <h4 className="text-lg text-primary font-semibold mb-3">{item.institution}</h4>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminCertificationsEditor } from '@/components/admin/AdminCertificationsEditor';

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  credentialId?: string;
  description: string;
}

interface InternationalCertificationsSectionProps {
  isAdminMode: boolean;
}

export const InternationalCertificationsSection = ({ isAdminMode }: InternationalCertificationsSectionProps) => {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: 1,
      title: "AWS Solutions Architect Associate",
      issuer: "Amazon Web Services",
      date: "2024",
      description: "Cloud architecture and AWS services expertise",
      credentialId: "AWS-ASA-123456"
    },
    {
      id: 2,
      title: "Google Cloud Professional",
      issuer: "Google Cloud Platform",
      date: "2024",
      description: "Professional cloud architect certification",
      credentialId: "GCP-PCA-789012"
    }
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('internationalCertificationsData');
    if (savedData) {
      try {
        setCertifications(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading international certifications data:', error);
      }
    }
  }, []);

  // Save data to localStorage when certifications change
  const handleCertificationsUpdate = (data: Certification[]) => {
    setCertifications(data);
    localStorage.setItem('internationalCertificationsData', JSON.stringify(data));
  };

  return (
    <section id="international-certifications" className="py-20 bg-background relative">
      <AdminCertificationsEditor 
        isAdminMode={isAdminMode}
        certifications={certifications}
        onCertificationsUpdate={handleCertificationsUpdate}
        sectionType="international"
      />
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              International <span className="bg-gradient-primary bg-clip-text text-transparent">Certifications</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-recognized certifications that validate my expertise in cutting-edge technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <Card 
                key={cert.id}
                className="bg-card/80 backdrop-blur-sm border-border hover:shadow-glow transition-all duration-500 hover:-translate-y-3 group animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-primary">
                    {cert.image ? (
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-primary flex items-center justify-center">
                        <div className="text-white text-center p-6">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold">🏆</span>
                          </div>
                          <h4 className="text-lg font-semibold">{cert.title}</h4>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-background/90 text-foreground">
                        {cert.date}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <CardTitle className="mb-2 text-lg group-hover:text-primary transition-colors">
                    {cert.title}
                  </CardTitle>
                  <p className="text-primary font-semibold mb-3">{cert.issuer}</p>
                  <p className="text-muted-foreground mb-4">{cert.description}</p>
                  {cert.credentialId && (
                    <div className="text-xs text-muted-foreground">
                      Credential ID: {cert.credentialId}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminCertificatesEditor } from '@/components/admin/AdminCertificatesEditor';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  type: string;
}

interface CertificatesSectionProps {
  isAdminMode: boolean;
}

export const CertificatesSection = ({ isAdminMode }: CertificatesSectionProps) => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "FreeCodeCamp",
      date: "2023",
      type: "Online Course"
    },
    {
      id: 2,
      title: "Python for Data Science",
      issuer: "Coursera",
      date: "2023",
      type: "Specialization"
    },
    {
      id: 3,
      title: "Machine Learning Fundamentals",
      issuer: "edX",
      date: "2024",
      type: "Professional Certificate"
    }
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('certificatesData');
    if (savedData) {
      try {
        setCertificates(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading certificates data:', error);
      }
    }
  }, []);

  // Save data to localStorage when certificates change
  const handleCertificatesUpdate = (data: Certificate[]) => {
    setCertificates(data);
    localStorage.setItem('certificatesData', JSON.stringify(data));
  };

  return (
    <section id="certificates" className="py-20 bg-muted/20 relative">
      <AdminCertificatesEditor 
        isAdminMode={isAdminMode}
        certificates={certificates}
        onCertificatesUpdate={handleCertificatesUpdate}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-secondary bg-clip-text text-transparent">Certificates</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-secondary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Continuous learning through professional development and skill enhancement programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <Card 
                key={cert.id}
                className="bg-card/80 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 hover:scale-105 group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg h-40 bg-gradient-secondary">
                    {cert.image ? (
                      <img 
                        src={cert.image} 
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-secondary flex items-center justify-center">
                        <div className="text-white text-center p-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-xl">📜</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-background/90 text-foreground text-xs">
                        {cert.date}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <CardTitle className="mb-2 text-sm group-hover:text-secondary transition-colors line-clamp-2">
                    {cert.title}
                  </CardTitle>
                  <p className="text-secondary font-medium text-sm mb-2">{cert.issuer}</p>
                  <Badge variant="outline" className="text-xs">
                    {cert.type}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
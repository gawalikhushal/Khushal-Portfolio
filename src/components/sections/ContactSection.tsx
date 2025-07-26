import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdminContactEditor } from '@/components/admin/AdminContactEditor';
import { AdminResumeUpload } from '@/components/admin/AdminResumeUpload';

interface ContactSectionProps {
  isAdminMode: boolean;
}

export const ContactSection = ({ isAdminMode }: ContactSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "gawalikhushal26@gmail.com",
    github: "https://github.com/gawalikhushal",
    linkedin: "https://linkedin.com/in/gawalikhushal",
    location: "Maharashtra, India",
    resumeText: "Download Resume",
    sectionTitle: "Get In Touch",
    sectionSubtitle: "Let's Connect",
    description: "Let's discuss opportunities, collaborations, or just connect over our shared passion for technology"
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('contactData');
    if (savedData) {
      try {
        setContactInfo(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading contact data:', error);
      }
    }
  }, []);

  // Save data to localStorage when contact info changes
  const handleContactUpdate = (data: typeof contactInfo) => {
    setContactInfo(data);
    localStorage.setItem('contactData', JSON.stringify(data));
  };

  const contactInfoItems = [
    {
      icon: Mail,
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`
    },
    {
      icon: Github,
      label: "GitHub",
      value: contactInfo.github.replace('https://', ''),
      href: contactInfo.github
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: contactInfo.linkedin.replace('https://', ''),
      href: contactInfo.linkedin
    },
    {
      icon: MapPin,
      label: "Location",
      value: contactInfo.location,
      href: null
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create email with form data
    const emailSubject = encodeURIComponent(formData.subject || 'Contact from Portfolio');
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:gawalikhushal26@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      toast({
        title: "Email Client Opened",
        description: "Your email client has been opened with the message details filled in.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleDownloadResume = () => {
    const resumeData = localStorage.getItem('resumeData');
    
    if (resumeData) {
      try {
        const { name, data } = JSON.parse(resumeData);
        
        // Create download link
        const link = document.createElement('a');
        link.href = data;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast({
          title: "Resume Downloaded",
          description: "Resume has been downloaded successfully!",
        });
      } catch (error) {
        console.error('Error downloading resume:', error);
        toast({
          title: "Download Failed",
          description: "Failed to download resume. Please try again.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "No Resume Available",
        description: "No resume has been uploaded yet.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/20 relative">
      <div className="absolute top-6 right-6 z-30 flex gap-2">
        <AdminContactEditor 
          isAdminMode={isAdminMode}
          contactInfo={contactInfo}
          onContactUpdate={handleContactUpdate}
        />
        <AdminResumeUpload isAdminMode={isAdminMode} />
      </div>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {contactInfo.sectionTitle.split(' ').map((word, index) => 
                index === contactInfo.sectionTitle.split(' ').length - 1 ? (
                  <span key={index} className="bg-gradient-primary bg-clip-text text-transparent">{word}</span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {contactInfo.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 animate-slide-up">
              <div>
                <h3 className="text-2xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
                  {contactInfo.sectionSubtitle}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  I'm always excited to discuss new opportunities, collaborate on interesting projects, 
                  or simply connect with fellow tech enthusiasts. Feel free to reach out through any 
                  of the channels below.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfoItems.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-card/50 hover:bg-card transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleDownloadResume}
                className="w-full bg-gradient-secondary hover:opacity-90 text-white font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                {contactInfo.resumeText}
              </Button>
            </div>

            {/* Contact Form */}
            <Card className="bg-card/80 backdrop-blur-sm border-border animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-background/50 border-border focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="bg-background/50 border-border focus:border-primary"
                  />
                  
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-background/50 border-border focus:border-primary resize-none"
                  />
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-primary hover:opacity-90 text-background font-semibold"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
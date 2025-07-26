import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { AdminProjectsEditor } from '@/components/admin/AdminProjectsEditor';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: string;
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

interface ProjectsSectionProps {
  isAdminMode: boolean;
}

export const ProjectsSection = ({ isAdminMode }: ProjectsSectionProps) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "College Library Management System",
      description: "Web system for managing books, student records, and book issue logs",
      fullDescription: "A comprehensive web-based library management system built with Node.js and Express.js. Features include book cataloging, student registration, issue/return tracking, fine calculation, and administrative dashboard. The system uses MySQL for data persistence and includes role-based access control.",
      technologies: ["Node.js", "Express.js", "MySQL", "HTML", "CSS", "JavaScript"],
      category: "Web Development",
      features: [
        "Book catalog management",
        "Student registration system", 
        "Issue/return tracking",
        "Fine calculation",
        "Admin dashboard",
        "Role-based access control"
      ]
    },
    {
      id: 2,
      title: "Face Recognition Student Monitoring",
      description: "Tracks student attendance using facial recognition and verifies ID cards",
      fullDescription: "An intelligent monitoring system that uses computer vision to track student attendance. Built with Python and OpenCV, it features real-time face detection, recognition, and verification against student databases. Also includes ID card verification and uniform compliance checking.",
      technologies: ["Python", "OpenCV", "SQLite", "NumPy", "Machine Learning"],
      category: "AI/ML",
      features: [
        "Real-time face recognition",
        "Attendance tracking",
        "ID card verification",
        "Uniform compliance check",
        "SQLite database integration",
        "Automated reporting"
      ]
    },
    {
      id: 3,
      title: "My Notes App",
      description: "Browser-based note-taking app using LocalStorage with responsive UI",
      fullDescription: "A sleek, responsive note-taking application built with vanilla JavaScript. Features include rich text editing, note categorization, search functionality, and local storage persistence. The app works offline and provides a clean, intuitive interface for organizing thoughts and ideas.",
      technologies: ["HTML", "CSS", "JavaScript", "LocalStorage", "Responsive Design"],
      category: "Web Development",
      features: [
        "Rich text editing",
        "Note categorization",
        "Search functionality",
        "Local storage persistence",
        "Responsive design",
        "Offline functionality"
      ],
      githubUrl: "https://github.com/gawalikhushal/my-notes-app",
      liveUrl: ""
    }
  ]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('projectsData');
    if (savedData) {
      try {
        setProjects(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading projects data:', error);
      }
    }
  }, []);

  // Save data to localStorage when projects change
  const handleProjectsUpdate = (data: Project[]) => {
    setProjects(data);
    localStorage.setItem('projectsData', JSON.stringify(data));
  };

  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 bg-muted/20 relative">
      <AdminProjectsEditor 
        isAdminMode={isAdminMode}
        projects={projects}
        onProjectsUpdate={handleProjectsUpdate}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A showcase of my technical projects spanning web development, AI/ML, and system design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id}
                className="bg-card/80 backdrop-blur-sm border-border hover:shadow-card transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg h-48 bg-gradient-secondary">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-secondary" />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                        <Badge variant="secondary" className="bg-primary text-background">
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <CardTitle className="mb-3 text-lg">{project.title}</CardTitle>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge key={techIndex} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 hover:bg-primary hover:text-background"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
                            {project.title}
                          </DialogTitle>
                          <DialogDescription className="text-lg">
                            {project.fullDescription}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-2 text-primary">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2 text-primary">Key Features</h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {project.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    {project.githubUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-secondary hover:text-background"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-background"
            >
              <Github className="w-5 h-5 mr-2" />
              View More on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
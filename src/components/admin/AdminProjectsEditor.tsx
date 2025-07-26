import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface AdminProjectsEditorProps {
  isAdminMode: boolean;
  projects: Project[];
  onProjectsUpdate: (projects: Project[]) => void;
}

export const AdminProjectsEditor = ({ isAdminMode, projects, onProjectsUpdate }: AdminProjectsEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Project[]>(projects);
  const { toast } = useToast();

  const handleSave = () => {
    onProjectsUpdate(formData);
    setIsOpen(false);
    toast({
      title: "Projects updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(projects);
    setIsOpen(false);
  };

  const addProject = () => {
    const newId = Math.max(...formData.map(p => p.id), 0) + 1;
    setFormData([...formData, {
      id: newId,
      title: '',
      description: '',
      fullDescription: '',
      technologies: [],
      category: 'Web Development',
      features: [],
      githubUrl: '',
      liveUrl: ''
    }]);
  };

  const removeProject = (id: number) => {
    setFormData(formData.filter(p => p.id !== id));
  };

  const updateProject = (id: number, field: keyof Project, value: any) => {
    setFormData(formData.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updateArrayField = (id: number, field: 'technologies' | 'features', value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    updateProject(id, field, array);
  };

  if (!isAdminMode) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="absolute top-4 right-4 z-20 bg-accent hover:bg-accent/90"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Projects
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Projects Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Projects</h3>
            <Button onClick={addProject} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
          
          <div className="space-y-6">
            {formData.map((project) => (
              <div key={project.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Project {project.id}</h4>
                  <Button
                    onClick={() => removeProject(project.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={project.title}
                      onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      placeholder="Project title"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select
                      value={project.category}
                      onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="AI/ML">AI/ML</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Short Description</label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="Brief project description"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Full Description</label>
                  <Textarea
                    value={project.fullDescription}
                    onChange={(e) => updateProject(project.id, 'fullDescription', e.target.value)}
                    placeholder="Detailed project description"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Technologies (comma-separated)</label>
                    <Input
                      value={project.technologies.join(', ')}
                      onChange={(e) => updateArrayField(project.id, 'technologies', e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Features (comma-separated)</label>
                    <Input
                      value={project.features.join(', ')}
                      onChange={(e) => updateArrayField(project.id, 'features', e.target.value)}
                      placeholder="Feature 1, Feature 2, Feature 3"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">GitHub URL (optional)</label>
                    <Input
                      value={project.githubUrl || ''}
                      onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Live URL (optional)</label>
                    <Input
                      value={project.liveUrl || ''}
                      onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                      placeholder="https://project-demo.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Project Image (optional)</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          updateProject(project.id, 'image', event.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mb-2"
                  />
                  {project.image && (
                    <div className="mt-2">
                      <img 
                        src={project.image} 
                        alt="Project preview" 
                        className="w-32 h-20 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button onClick={handleCancel} variant="outline" className="flex-1">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-gradient-primary">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
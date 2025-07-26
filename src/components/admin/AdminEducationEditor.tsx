import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

interface AdminEducationEditorProps {
  isAdminMode: boolean;
  timelineItems: TimelineItem[];
  onTimelineUpdate: (items: TimelineItem[]) => void;
}

export const AdminEducationEditor = ({ isAdminMode, timelineItems, onTimelineUpdate }: AdminEducationEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<TimelineItem[]>(timelineItems);
  const { toast } = useToast();

  const handleSave = () => {
    onTimelineUpdate(formData);
    setIsOpen(false);
    toast({
      title: "Education & Experience updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(timelineItems);
    setIsOpen(false);
  };

  const addItem = (type: 'education' | 'experience') => {
    const newId = Math.max(...formData.map(item => item.id), 0) + 1;
    setFormData([...formData, {
      id: newId,
      type,
      title: '',
      institution: '',
      period: '',
      location: '',
      description: '',
      skills: []
    }]);
  };

  const removeItem = (id: number) => {
    setFormData(formData.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: keyof TimelineItem, value: any) => {
    setFormData(formData.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const updateSkills = (id: number, skillsString: string) => {
    const skills = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    updateItem(id, 'skills', skills);
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
          Edit Timeline
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Education & Experience</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex gap-3">
            <Button onClick={() => addItem('education')} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
            <Button onClick={() => addItem('experience')} variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
          
          <div className="space-y-6">
            {formData.map((item) => (
              <div key={item.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{item.type === 'education' ? 'Education' : 'Experience'} #{item.id}</h4>
                    <select
                      value={item.type}
                      onChange={(e) => updateItem(item.id, 'type', e.target.value as 'education' | 'experience')}
                      className="p-1 border rounded text-sm"
                    >
                      <option value="education">Education</option>
                      <option value="experience">Experience</option>
                    </select>
                  </div>
                  <Button
                    onClick={() => removeItem(item.id)}
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
                      value={item.title}
                      onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                      placeholder="Degree/Position title"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Institution/Company</label>
                    <Input
                      value={item.institution}
                      onChange={(e) => updateItem(item.id, 'institution', e.target.value)}
                      placeholder="Institution or company name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Period</label>
                    <Input
                      value={item.period}
                      onChange={(e) => updateItem(item.id, 'period', e.target.value)}
                      placeholder="2022 - 2026"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      value={item.location}
                      onChange={(e) => updateItem(item.id, 'location', e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Description of your studies/work"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Skills (comma-separated)</label>
                  <Input
                    value={item.skills.join(', ')}
                    onChange={(e) => updateSkills(item.id, e.target.value)}
                    placeholder="Python, Machine Learning, Data Analysis"
                  />
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
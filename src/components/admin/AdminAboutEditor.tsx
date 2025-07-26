import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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

interface AdminAboutEditorProps {
  isAdminMode: boolean;
  aboutData: AboutData;
  onAboutUpdate: (data: AboutData) => void;
}

export const AdminAboutEditor = ({ isAdminMode, aboutData, onAboutUpdate }: AdminAboutEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<AboutData>(aboutData);
  const { toast } = useToast();

  const iconNames = ['Brain', 'Code', 'Shield', 'Users', 'Star', 'Heart', 'Target', 'Zap', 'Globe', 'Rocket'];

  const handleSave = () => {
    onAboutUpdate(formData);
    setIsOpen(false);
    toast({
      title: "About section updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(aboutData);
    setIsOpen(false);
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, { icon: 'Star', title: '', description: '' }]
    });
  };

  const removeHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index)
    });
  };

  const updateHighlight = (index: number, field: keyof Highlight, value: string) => {
    const updatedHighlights = formData.highlights.map((highlight, i) =>
      i === index ? { ...highlight, [field]: value } : highlight
    );
    setFormData({ ...formData, highlights: updatedHighlights });
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
          Edit About
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit About Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Your bio description"
              rows={6}
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium">Highlights</label>
              <Button onClick={addHighlight} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Highlight
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Highlight {index + 1}</h4>
                    <Button
                      onClick={() => removeHighlight(index)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium">Icon</label>
                      <select
                        value={highlight.icon}
                        onChange={(e) => updateHighlight(index, 'icon', e.target.value)}
                        className="w-full p-2 border rounded"
                      >
                        {iconNames.map(iconName => (
                          <option key={iconName} value={iconName}>{iconName}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium">Title</label>
                      <Input
                        value={highlight.title}
                        onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                        placeholder="Highlight title"
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium">Description</label>
                      <Input
                        value={highlight.description}
                        onChange={(e) => updateHighlight(index, 'description', e.target.value)}
                        placeholder="Highlight description"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
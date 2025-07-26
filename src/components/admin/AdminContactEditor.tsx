import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  location: string;
  resumeText: string;
  sectionTitle: string;
  sectionSubtitle: string;
  description: string;
}

interface AdminContactEditorProps {
  isAdminMode: boolean;
  contactInfo: ContactInfo;
  onContactUpdate: (contact: ContactInfo) => void;
}

export const AdminContactEditor = ({ isAdminMode, contactInfo, onContactUpdate }: AdminContactEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<ContactInfo>(contactInfo);
  const { toast } = useToast();

  const handleSave = () => {
    onContactUpdate(formData);
    setIsOpen(false);
    toast({
      title: "Contact information updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(contactInfo);
    setIsOpen(false);
  };

  const updateField = (field: keyof ContactInfo, value: string) => {
    setFormData({ ...formData, [field]: value });
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
          Edit Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Contact Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Section Title</label>
            <Input
              value={formData.sectionTitle}
              onChange={(e) => updateField('sectionTitle', e.target.value)}
              placeholder="Get In Touch"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Section Subtitle</label>
            <Input
              value={formData.sectionSubtitle}
              onChange={(e) => updateField('sectionSubtitle', e.target.value)}
              placeholder="Let's Connect"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Section description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => updateField('location', e.target.value)}
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">GitHub URL</label>
              <Input
                value={formData.github}
                onChange={(e) => updateField('github', e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input
                value={formData.linkedin}
                onChange={(e) => updateField('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Resume Button Text</label>
            <Input
              value={formData.resumeText}
              onChange={(e) => updateField('resumeText', e.target.value)}
              placeholder="Download Resume"
            />
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
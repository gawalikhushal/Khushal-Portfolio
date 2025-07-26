import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface HeroData {
  name: string;
  title: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  hackerrankUrl: string;
  email: string;
}

interface AdminHeroEditorProps {
  isAdminMode: boolean;
  heroData: HeroData;
  onHeroUpdate: (data: HeroData) => void;
}

export const AdminHeroEditor = ({ isAdminMode, heroData, onHeroUpdate }: AdminHeroEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<HeroData>(heroData);
  const { toast } = useToast();

  const handleSave = () => {
    onHeroUpdate(formData);
    setIsOpen(false);
    toast({
      title: "Hero section updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(heroData);
    setIsOpen(false);
  };

  if (!isAdminMode) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-accent hover:bg-accent/90"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Hero
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Hero Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Your professional title"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Your bio description"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">GitHub URL</label>
              <Input
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">LeetCode URL</label>
              <Input
                value={formData.leetcodeUrl}
                onChange={(e) => setFormData({ ...formData, leetcodeUrl: e.target.value })}
                placeholder="https://leetcode.com/u/username"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">HackerRank URL</label>
              <Input
                value={formData.hackerrankUrl}
                onChange={(e) => setFormData({ ...formData, hackerrankUrl: e.target.value })}
                placeholder="https://www.hackerrank.com/profile/username"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
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
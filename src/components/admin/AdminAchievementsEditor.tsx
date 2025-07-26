import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  image?: string;
  category: string;
  icon: string;
}

interface AdminAchievementsEditorProps {
  isAdminMode: boolean;
  achievements: Achievement[];
  onAchievementsUpdate: (achievements: Achievement[]) => void;
}

export const AdminAchievementsEditor = ({ isAdminMode, achievements, onAchievementsUpdate }: AdminAchievementsEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Achievement[]>(achievements);
  const { toast } = useToast();

  const handleSave = () => {
    onAchievementsUpdate(formData);
    setIsOpen(false);
    toast({
      title: "Achievements updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(achievements);
    setIsOpen(false);
  };

  const addAchievement = () => {
    const newId = Math.max(...formData.map(a => a.id), 0) + 1;
    setFormData([...formData, {
      id: newId,
      title: '',
      description: '',
      date: '',
      category: 'Academic',
      icon: 'trophy'
    }]);
  };

  const removeAchievement = (id: number) => {
    setFormData(formData.filter(a => a.id !== id));
  };

  const updateAchievement = (id: number, field: keyof Achievement, value: any) => {
    setFormData(formData.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const moveAchievement = (id: number, direction: 'up' | 'down') => {
    const index = formData.findIndex(a => a.id === id);
    if ((direction === 'up' && index > 0) || (direction === 'down' && index < formData.length - 1)) {
      const newFormData = [...formData];
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      [newFormData[index], newFormData[swapIndex]] = [newFormData[swapIndex], newFormData[index]];
      setFormData(newFormData);
    }
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
          Edit Achievements
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Achievements Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Achievements</h3>
            <Button onClick={addAchievement} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Achievement
            </Button>
          </div>
          
          <div className="space-y-6">
            {formData.map((achievement, index) => (
              <div key={achievement.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Achievement {index + 1}</h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => moveAchievement(achievement.id, 'up')}
                      size="sm"
                      variant="outline"
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => moveAchievement(achievement.id, 'down')}
                      size="sm"
                      variant="outline"
                      disabled={index === formData.length - 1}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => removeAchievement(achievement.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={achievement.title}
                    onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                    placeholder="Achievement title"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={achievement.description}
                    onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                    placeholder="Achievement description"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      value={achievement.date}
                      onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                      placeholder="2024"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <select
                      value={achievement.category}
                      onChange={(e) => updateAchievement(achievement.id, 'category', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="Academic">Academic</option>
                      <option value="Innovation">Innovation</option>
                      <option value="Community">Community</option>
                      <option value="Competition">Competition</option>
                      <option value="Leadership">Leadership</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Icon</label>
                    <select
                      value={achievement.icon}
                      onChange={(e) => updateAchievement(achievement.id, 'icon', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="trophy">Trophy</option>
                      <option value="star">Star</option>
                      <option value="award">Award</option>
                      <option value="target">Target</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Achievement Image (optional)</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          updateAchievement(achievement.id, 'image', event.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mb-2"
                  />
                  {achievement.image && (
                    <div className="mt-2">
                      <img 
                        src={achievement.image} 
                        alt="Achievement preview" 
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
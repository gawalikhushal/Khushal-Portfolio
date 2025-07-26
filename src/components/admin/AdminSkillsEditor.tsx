import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface AdminSkillsEditorProps {
  isAdminMode: boolean;
  skillCategories: SkillCategory[];
  softSkills: string[];
  onSkillsUpdate: (categories: SkillCategory[], soft: string[]) => void;
}

export const AdminSkillsEditor = ({ isAdminMode, skillCategories, softSkills, onSkillsUpdate }: AdminSkillsEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<SkillCategory[]>(skillCategories);
  const [softSkillsList, setSoftSkillsList] = useState<string[]>(softSkills);
  const { toast } = useToast();

  const handleSave = () => {
    onSkillsUpdate(categories, softSkillsList);
    setIsOpen(false);
    toast({
      title: "Skills updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setCategories(skillCategories);
    setSoftSkillsList(softSkills);
    setIsOpen(false);
  };

  const addCategory = () => {
    setCategories([...categories, { category: '', skills: [] }]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, field: 'category', value: string) => {
    setCategories(categories.map((cat, i) => i === index ? { ...cat, [field]: value } : cat));
  };

  const addSkill = (categoryIndex: number) => {
    const updatedCategories = categories.map((cat, i) => 
      i === categoryIndex 
        ? { ...cat, skills: [...cat.skills, { name: '', level: 50 }] }
        : cat
    );
    setCategories(updatedCategories);
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedCategories = categories.map((cat, i) => 
      i === categoryIndex 
        ? { ...cat, skills: cat.skills.filter((_, si) => si !== skillIndex) }
        : cat
    );
    setCategories(updatedCategories);
  };

  const updateSkill = (categoryIndex: number, skillIndex: number, field: keyof Skill, value: string | number) => {
    const updatedCategories = categories.map((cat, i) => 
      i === categoryIndex 
        ? {
            ...cat, 
            skills: cat.skills.map((skill, si) => 
              si === skillIndex ? { ...skill, [field]: value } : skill
            )
          }
        : cat
    );
    setCategories(updatedCategories);
  };

  const updateSoftSkills = (skillsString: string) => {
    const skills = skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
    setSoftSkillsList(skills);
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
          Edit Skills
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Skills Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Technical Skills */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Technical Skills</h3>
              <Button onClick={addCategory} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
            
            <div className="space-y-6">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Input
                      value={category.category}
                      onChange={(e) => updateCategory(categoryIndex, 'category', e.target.value)}
                      placeholder="Category name (e.g., Programming Languages)"
                      className="flex-1 mr-3"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => addSkill(categoryIndex)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => removeCategory(categoryIndex)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-5">
                          <Input
                            value={skill.name}
                            onChange={(e) => updateSkill(categoryIndex, skillIndex, 'name', e.target.value)}
                            placeholder="Skill name"
                          />
                        </div>
                        <div className="col-span-3">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => updateSkill(categoryIndex, skillIndex, 'level', parseInt(e.target.value))}
                            placeholder="Level (0-100)"
                          />
                        </div>
                        <div className="col-span-3">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-gradient-primary h-2 rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                        <div className="col-span-1">
                          <Button
                            onClick={() => removeSkill(categoryIndex, skillIndex)}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Soft Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Soft Skills</h3>
            <div>
              <label className="text-sm font-medium">Skills (comma-separated)</label>
              <Input
                value={softSkillsList.join(', ')}
                onChange={(e) => updateSoftSkills(e.target.value)}
                placeholder="Problem Solving, Team Collaboration, Communication"
              />
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
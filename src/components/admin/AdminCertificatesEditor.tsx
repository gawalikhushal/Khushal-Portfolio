import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Save, X, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  type: string;
}

interface AdminCertificatesEditorProps {
  isAdminMode: boolean;
  certificates: Certificate[];
  onCertificatesUpdate: (certificates: Certificate[]) => void;
}

export const AdminCertificatesEditor = ({ isAdminMode, certificates, onCertificatesUpdate }: AdminCertificatesEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Certificate[]>(certificates);
  const { toast } = useToast();

  const handleSave = () => {
    onCertificatesUpdate(formData);
    setIsOpen(false);
    toast({
      title: "Certificates updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData(certificates);
    setIsOpen(false);
  };

  const addCertificate = () => {
    const newId = Math.max(...formData.map(c => c.id), 0) + 1;
    setFormData([...formData, {
      id: newId,
      title: '',
      issuer: '',
      date: '',
      type: 'Online Course'
    }]);
  };

  const removeCertificate = (id: number) => {
    setFormData(formData.filter(c => c.id !== id));
  };

  const updateCertificate = (id: number, field: keyof Certificate, value: any) => {
    setFormData(formData.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const moveCertificate = (id: number, direction: 'up' | 'down') => {
    const index = formData.findIndex(c => c.id === id);
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
          Edit Certificates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Certificates Section</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Certificates</h3>
            <Button onClick={addCertificate} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Certificate
            </Button>
          </div>
          
          <div className="space-y-6">
            {formData.map((cert, index) => (
              <div key={cert.id} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Certificate {index + 1}</h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => moveCertificate(cert.id, 'up')}
                      size="sm"
                      variant="outline"
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => moveCertificate(cert.id, 'down')}
                      size="sm"
                      variant="outline"
                      disabled={index === formData.length - 1}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => removeCertificate(cert.id)}
                      size="sm"
                      variant="destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={cert.title}
                      onChange={(e) => updateCertificate(cert.id, 'title', e.target.value)}
                      placeholder="Certificate title"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Issuer</label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertificate(cert.id, 'issuer', e.target.value)}
                      placeholder="Issuing organization"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      value={cert.date}
                      onChange={(e) => updateCertificate(cert.id, 'date', e.target.value)}
                      placeholder="2024"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <select
                      value={cert.type}
                      onChange={(e) => updateCertificate(cert.id, 'type', e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      <option value="Online Course">Online Course</option>
                      <option value="Specialization">Specialization</option>
                      <option value="Professional Certificate">Professional Certificate</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Bootcamp">Bootcamp</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Certificate Image (optional)</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          updateCertificate(cert.id, 'image', event.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mb-2"
                  />
                  {cert.image && (
                    <div className="mt-2">
                      <img 
                        src={cert.image} 
                        alt="Certificate preview" 
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
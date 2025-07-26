import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, Camera, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminPhotoUploadProps {
  currentImage: string;
  onImageUpdate: (newImageUrl: string) => void;
  isAdminMode: boolean;
}

export const AdminPhotoUpload = ({ currentImage, onImageUpdate, isAdminMode }: AdminPhotoUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      // Simulate upload process - in real implementation, you'd upload to your server/cloud storage
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a permanent URL for the uploaded image
      const permanentUrl = URL.createObjectURL(selectedFile);
      onImageUpdate(permanentUrl);
      
      toast({
        title: "Photo updated successfully!",
        description: "Your profile photo has been updated.",
      });
      
      setIsOpen(false);
      setSelectedFile(null);
      setPreviewUrl('');
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl('');
  };

  if (!isAdminMode) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-background p-0 shadow-lg z-10"
        >
          <Camera className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Update Profile Photo
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Photo */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">Current Photo</p>
            <img
              src={currentImage}
              alt="Current profile"
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-border"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Max file size: 5MB. Supported formats: JPG, PNG, WebP
              </p>
            </div>

            {/* Preview */}
            {previewUrl && (
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">Preview</p>
                <div className="relative inline-block">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-primary"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={clearSelection}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="flex-1 bg-gradient-primary hover:opacity-90 text-background"
            >
              {isUploading ? "Uploading..." : "Update Photo"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
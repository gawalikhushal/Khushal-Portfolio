import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Key, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminToggleProps {
  isAdminMode: boolean;
  onAdminModeChange: (isAdmin: boolean) => void;
}

export const AdminToggle = ({ isAdminMode, onAdminModeChange }: AdminToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  // Simple admin password - in real implementation, use proper authentication
  const ADMIN_PASSWORD = 'khushal2024';

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      onAdminModeChange(true);
      setIsOpen(false);
      setPassword('');
      toast({
        title: "Admin mode activated",
        description: "You can now edit your profile content.",
      });
    } else {
      toast({
        title: "Invalid password",
        description: "Please enter the correct admin password.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    onAdminModeChange(false);
    toast({
      title: "Admin mode deactivated",
      description: "You are now in view-only mode.",
    });
  };

  return (
    <>
      {/* Admin Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isAdminMode ? (
          <Button
            onClick={handleLogout}
            className="bg-accent hover:bg-accent/90 text-white shadow-lg"
          >
            <Settings className="w-4 h-4 mr-2" />
            Exit Admin
          </Button>
        ) : (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-background/80 backdrop-blur-sm border-border shadow-lg"
              >
                <Key className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Admin Access
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogin}
                    disabled={!password}
                    className="flex-1 bg-gradient-primary hover:opacity-90 text-background"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Admin Mode Indicator */}
      {isAdminMode && (
        <div className="fixed top-20 right-6 z-50">
          <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-pulse-glow">
            Admin Mode Active
          </div>
        </div>
      )}
    </>
  );
};
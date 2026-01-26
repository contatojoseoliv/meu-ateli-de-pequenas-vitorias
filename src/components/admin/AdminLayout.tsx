import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <h2 className="font-serif text-xl font-bold text-foreground">Admin</h2>
        <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 mt-2 text-sm text-muted-foreground hover:text-foreground"
        >
          ← Voltar ao site
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col bg-background border-r border-border">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between p-4 bg-background border-b border-border">
        <h2 className="font-serif text-lg font-bold">Admin</h2>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <NavContent />
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

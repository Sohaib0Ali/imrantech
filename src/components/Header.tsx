import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { UserCircle, LogIn, LayoutDashboard, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Smart TV Software", path: "/software" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-blue text-white font-bold text-xl p-2 rounded-md shadow-sm hover:shadow-md transition-all">
              SOFTWARE
            </div>
            <span className="font-bold text-xl">Zone Firmware</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary hover:scale-105 transform px-3 py-2 rounded-md",
                  isActive(item.path)
                    ? "text-primary border-b-2 border-primary bg-primary/5"
                    : "text-muted-foreground hover:bg-accent/50"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center text-sm font-medium text-primary animate-fade-in">
                  <UserCircle className="h-5 w-5 mr-1" />
                  <span>
                    {user.user_metadata.full_name || user.email?.split('@')[0]}
                  </span>
                </div>
                {isAdmin && (
                  <Button size="sm" variant="outline" className="hover:border-primary hover:shadow-sm transition-all" asChild>
                    <Link to="/admin">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => signOut()} 
                  className="hover:bg-destructive/10 hover:text-destructive transition-all"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button size="sm" className="btn-hover bg-gradient-blue shadow-sm hover:shadow-md" asChild>
                <Link to="/auth">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-accent/50 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in bg-background/95 backdrop-blur-sm rounded-b-lg shadow-sm">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    isActive(item.path)
                      ? "text-primary bg-primary/10 border-l-2 border-primary"
                      : "text-muted-foreground hover:bg-accent/50"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <div className="px-4 py-2 border-t border-border flex items-center">
                    <UserCircle className="h-5 w-5 mr-1 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {user.user_metadata.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 text-sm font-medium flex items-center hover:bg-accent/50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="justify-start px-4 text-sm hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="px-4 py-2 text-sm font-medium flex items-center bg-gradient-blue text-white rounded-md shadow-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

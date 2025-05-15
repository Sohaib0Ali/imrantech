
import { Server, Tv, BookOpen, Code, Cpu, Settings, Shield, Globe } from "lucide-react";

export const renderIcon = (iconName: string | undefined, className?: string) => {
  if (!iconName) {
    return <Server className={className} />;
  }
  
  switch (iconName.toLowerCase()) {
    case 'server':
      return <Server className={className} />;
    case 'tv':
      return <Tv className={className} />;
    case 'book-open':
      return <BookOpen className={className} />;
    case 'code':
      return <Code className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    case 'settings':
      return <Settings className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'globe':
      return <Globe className={className} />;
    default:
      return <Server className={className} />;
  }
};

export default renderIcon;

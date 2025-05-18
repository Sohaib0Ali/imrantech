import { SoftwareProps } from "@/components/SoftwareCard";
import { ElectronicsProps } from "@/components/ElectronicsCard";
import { ServiceProps } from "@/components/ServiceCard";

// Mock data for software
export const softwareMockData: SoftwareProps[] = [
  {
    id: "sw1",
    title: "Video Editing Suite",
    description: "Professional video editing software with advanced features for content creators and video professionals.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    category: "Multimedia"
  },
  {
    id: "sw2",
    title: "Security Antivirus Pro",
    description: "Advanced antivirus solution with real-time protection against malware, ransomware, and online threats.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    category: "Security"
  },
  {
    id: "sw3",
    title: "Office Productivity Suite",
    description: "Complete office productivity solution including word processing, spreadsheets, and presentation tools.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "Productivity"
  },
  {
    id: "sw4",
    title: "Database Management System",
    description: "Powerful database management system for organizing and analyzing large datasets efficiently.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    category: "Development"
  },
  {
    id: "sw5",
    title: "Graphic Design Pro",
    description: "Professional graphic design software with tools for creating stunning visuals, logos, and digital art.",
    imageUrl: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
    category: "Design"
  },
  {
    id: "sw6",
    title: "Code Editor IDE",
    description: "Advanced integrated development environment for coding, debugging, and building applications.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    category: "Development"
  },
];

// Mock data for services
export const servicesMockData: ServiceProps[] = [
  {
    id: "sv1",
    title: "Software Solutions",
    description: "Premium Smart TV software solutions and firmware updates. We provide reliable and tested software to enhance your Smart TV experience.",
    icon_name: "server"
  }
];

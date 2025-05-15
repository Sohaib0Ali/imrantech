
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

// Mock data for electronics
export const electronicsMockData: ElectronicsProps[] = [
  {
    id: "el1",
    title: "Smart LED TV",
    description: "4K Ultra HD Smart LED TV with HDR and built-in streaming apps.",
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=80",
    category: "TVs",
    price: 599.99,
    size: "55 inch"
  },
  {
    id: "el2",
    title: "RGB LED Strip",
    description: "Customizable RGB LED strip with remote control and app connectivity.",
    imageUrl: "https://images.unsplash.com/photo-1586253634026-5f8ff828c8f1?auto=format&fit=crop&w=800&q=80",
    category: "LEDs",
    price: 29.99,
    size: "5 meter"
  },
  {
    id: "el3",
    title: "Curved Gaming Monitor",
    description: "Ultra-wide curved gaming monitor with high refresh rate and low response time.",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    category: "Screens",
    price: 349.99,
    size: "27 inch"
  },
  {
    id: "el4",
    title: "Digital Signage Display",
    description: "Commercial-grade digital signage display for businesses and retail environments.",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    category: "Screens",
    price: 899.99,
    size: "42 inch"
  },
  {
    id: "el5",
    title: "OLED TV",
    description: "Premium OLED TV with perfect blacks and vibrant colors for an immersive viewing experience.",
    imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80",
    category: "TVs",
    price: 1299.99,
    size: "65 inch"
  },
  {
    id: "el6",
    title: "Outdoor LED Floodlight",
    description: "Weatherproof LED floodlight for outdoor security and illumination.",
    imageUrl: "https://images.unsplash.com/photo-1557428894-56bcc97113fe?auto=format&fit=crop&w=800&q=80",
    category: "LEDs",
    price: 79.99,
    size: "30W"
  },
];

// Mock data for services
export const servicesMockData: ServiceProps[] = [
  {
    id: "sv1",
    title: "Software Solutions",
    description: "Custom software solutions tailored to your business needs. From development to implementation and support.",
    icon_name: "server"
  },
  {
    id: "sv2",
    title: "Electronics Shop",
    description: "Quality electronic products including TVs, LEDs, and screens. Competitive prices and professional installation.",
    icon_name: "tv"
  },
  {
    id: "sv3",
    title: "Tech Consulting",
    description: "Expert technical consultancy services to help you make informed decisions about your technology investments.",
    icon_name: "book-open"
  },
];

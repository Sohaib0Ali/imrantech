import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Service } from "@/types/database";
import { Loader2, MessageSquare } from "lucide-react";

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setServices(data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
        // Fallback to default services if there's an error
        setServices([
          {
            id: "1",
            title: "Software Development",
            description: "Custom software solutions tailored to your business needs. We develop web applications, mobile apps, and enterprise software with the latest technologies.",
            icon_name: "Code",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "2",
            title: "Electronics Sales & Repair",
            description: "High-quality electronics products and professional repair services. We offer LEDs, TVs, screens, and other electronic devices with installation and maintenance.",
            icon_name: "Tv",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "3",
            title: "IT Consulting",
            description: "Expert IT consulting services to help you make the right technology decisions. Our consultants provide strategic guidance for digital transformation.",
            icon_name: "BarChart",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "4",
            title: "Technical Support",
            description: "Reliable technical support for all your IT needs. Our team provides prompt assistance for hardware and software issues to minimize downtime.",
            icon_name: "HelpingHand",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "5",
            title: "Network Solutions",
            description: "Comprehensive network setup and management services. We design, implement, and maintain secure and efficient network infrastructure for businesses.",
            icon_name: "Network",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: "6",
            title: "Cloud Services",
            description: "Scalable cloud solutions for modern businesses. We help you migrate to the cloud, optimize cloud resources, and ensure data security.",
            icon_name: "Cloud",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to dynamically render icons based on icon_name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Code":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        );
      case "Tv":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
            <polyline points="17 2 12 7 7 2"></polyline>
          </svg>
        );
      case "BarChart":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="20" x2="12" y2="10"></line>
            <line x1="18" y1="20" x2="18" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="16"></line>
          </svg>
        );
      case "HelpingHand":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        );
      case "Network":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2" width="6" height="6"></rect>
            <rect x="16" y="16" width="6" height="6"></rect>
            <rect x="2" y="16" width="6" height="6"></rect>
            <path d="M5 16v-4h14v4"></path>
            <path d="M12 12V8"></path>
          </svg>
        );
      case "Cloud":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        );
    }
  };

  return (
    <div className="container mx-auto section-padding min-h-screen">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-blue text-transparent bg-clip-text">Our Services</h1>
        <p className="text-gray-600">
          We offer a wide range of technology services to meet your business and personal needs. From software development to electronics sales and repair, our team is dedicated to providing high-quality solutions.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-card shadow-lg rounded-xl p-8 border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group"
            >
              <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                {renderIcon(service.icon_name)}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <Button 
                variant="outline" 
                className="w-full hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
                onClick={() => window.open(`https://wa.me/+966537532084?text=I'm interested in your ${service.title} service. Can you provide more information?`, "_blank")}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Inquire Now
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-20 bg-gradient-blue rounded-xl p-8 text-white shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="mb-6">
              Our team is ready to develop tailored solutions for your specific requirements. 
              Contact us today to discuss your project and get a free consultation.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => window.open(`https://wa.me/+966537532084?text=I need a custom solution for my business. Can we discuss?`, "_blank")}
            >
              <MessageSquare className="mr-2 h-5 w-5" /> Contact Us Now
            </Button>
          </div>
          <div className="hidden lg:flex justify-end">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-white/10 rounded-full"></div>
              <div className="bg-white/20 p-8 rounded-xl backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 
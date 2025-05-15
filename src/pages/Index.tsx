
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import { servicesMockData } from "@/data/mockData";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <FeaturedProducts />
      
      {/* About Section */}
      <section className="section-padding container mx-auto bg-techhub-lightGray rounded-lg my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">About IMRAN Tech Hub</h2>
            <p className="text-gray-700">
              IMRAN Tech Hub is your one-stop destination for all technology needs. We specialize in providing high-quality software solutions and electronic products to meet your personal and business requirements.
            </p>
            <p className="text-gray-700">
              Founded with a passion for technology, we strive to deliver exceptional service and products that exceed our customers' expectations. Our team of experts carefully selects and tests each product to ensure top-notch quality and performance.
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">Learn More About Us</Link>
            </Button>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-techhub-purple rounded-full filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-techhub-lightBlue rounded-full filter blur-xl opacity-70"></div>
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
              alt="About IMRAN Tech Hub"
              className="rounded-lg shadow-xl relative z-10"
            />
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="section-padding container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesMockData.map((service, index) => (
            <div 
              key={service.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-gradient-blue text-white mt-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Discover our extensive collection of software and electronics, or get in touch with us for personalized assistance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="text-primary btn-hover" asChild>
              <Link to="/software">Browse Software</Link>
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 btn-hover" asChild>
              <Link to="/electronics">Shop Electronics</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

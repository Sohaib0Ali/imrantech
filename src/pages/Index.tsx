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
      
      {/* Featured Products Section */}
      <section className="section-padding container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Smart TV Software</h2>
        <FeaturedProducts />
      </section>
      
      {/* About Section */}
      <section className="section-padding container mx-auto bg-techhub-lightGray rounded-lg my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-bold">About Software Zone Firmware</h2>
            <p className="text-gray-700">
              Software Zone Firmware is your trusted destination for Smart TV software solutions. We specialize in providing high-quality firmware and software updates to enhance your Smart TV experience.
            </p>
            <p className="text-gray-700">
              Founded with a passion for technology, we strive to deliver exceptional software solutions that exceed our customers' expectations. Our team of experts carefully tests each software to ensure top-notch quality and performance.
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">Learn More About Us</Link>
            </Button>
          </div>
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-techhub-purple rounded-full filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-techhub-lightBlue rounded-full filter blur-xl opacity-70"></div>
            <img
              src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80"
              alt="About Software Zone Firmware"
              className="rounded-lg shadow-xl relative z-10"
            />
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="section-padding w-full bg-techhub-lightGray">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Software Solutions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the next level of Smart TV performance with our advanced software and firmware solutions, designed for seamless updates, enhanced features, and total reliability.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full bg-white p-10 rounded-2xl border-2 border-border shadow-xl animate-fade-in max-w-5xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80" alt="Smart TV Software Solution" className="w-full md:w-1/3 rounded-xl shadow-md" />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 text-primary">Smart TV Software & Firmware Upgrades</h3>
                  <p className="text-muted-foreground mb-4">
                    Our expert team delivers tailored software and firmware updates for a wide range of Smart TVs, ensuring optimal performance, security, and access to the latest features. We provide:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Seamless over-the-air and manual firmware upgrades</li>
                    <li>Custom app and feature integration</li>
                    <li>Personalized technical support and troubleshooting</li>
                    <li>Compatibility with major Smart TV brands</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section-padding bg-gradient-blue text-white mt-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Smart TV?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get in touch with us to learn more about our Smart TV software solutions and how we can help you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="text-primary btn-hover" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

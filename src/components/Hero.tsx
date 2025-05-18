import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-soft animated-gradient">
      <div className="container mx-auto section-padding flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 space-y-6 mb-10 md:mb-0 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-primary">Software Zone Firmware</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md">
            Your trusted destination for Smart TV software solutions and premium firmware updates.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="relative w-full max-w-md">
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-techhub-lightBlue rounded-full filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-techhub-purple rounded-full filter blur-xl opacity-70"></div>
            <img
              src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80"
              alt="Smart TV Interface"
              className="w-full h-auto rounded-2xl shadow-xl relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

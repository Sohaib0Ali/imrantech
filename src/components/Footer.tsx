import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-blue text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white text-primary font-bold text-xl p-2 rounded-md">
                SOFTWARE
              </div>
              <span className="font-bold text-xl">Zone Firmware</span>
            </div>
            <p className="text-sm text-white/80">
              Your trusted source for Smart TV software solutions. Quality firmware and exceptional support.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm hover:text-white/80 transition-colors">
                Home
              </Link>
              <Link to="/software" className="text-sm hover:text-white/80 transition-colors">
                Smart TV Software
              </Link>
              <Link to="/contact" className="text-sm hover:text-white/80 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg">Contact</h3>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Email: aarabiaokaz@gmail.com</p>
              <p className="text-sm">Phone: +966537532084</p>
              <p className="text-sm">Address: Riyadh, Saudi Arabia</p>
            </div>
            <div className="mt-4">
              <a 
                href="https://wa.me/+966537532084" 
                className="flex items-center gap-2 text-sm text-white hover:text-white/80 transition-colors"
              >
                <div className="bg-green-500 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4" />
                </div>
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto py-4 px-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Software Zone Firmware. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

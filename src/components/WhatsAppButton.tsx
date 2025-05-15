import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/+966537532084", "_blank");
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0"
      }`}
    >
      <Button
        onClick={handleOpenWhatsApp}
        className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl p-0 animate-bounce"
        aria-label="Contact via WhatsApp - Riyadh, Saudi Arabia"
      >
        <Phone className="h-6 w-6" />
      </Button>
      <div className="absolute top-0 left-0 w-14 h-14 bg-green-500/50 rounded-full animate-ping"></div>
    </div>
  );
};

export default WhatsAppButton;

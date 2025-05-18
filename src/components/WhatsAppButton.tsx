import { MessageSquare } from "lucide-react";

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/+966537532084?text=Hello! I would like to know more about your Smart TV software solutions.', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 z-50 flex items-center gap-2 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageSquare className="h-6 w-6" />
      <span className="hidden md:block font-medium">Chat with us</span>
    </button>
  );
};

export default WhatsAppButton;

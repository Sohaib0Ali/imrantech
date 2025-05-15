import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Phone } from "lucide-react";

export interface ElectronicsProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  price: number;
  size: string;
  download_link?: string | null;
}

interface ElectronicsCardProps {
  product: ElectronicsProps;
}

const ElectronicsCard = ({ product }: ElectronicsCardProps) => {
  const { title, description, imageUrl, category, price, size, download_link } = product;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const handleContact = () => {
    window.open(`https://wa.me/+966537532084?text=Hello! I'm interested in ${title}. Can you provide more information?`, '_blank');
  };

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-lg group">
      <div className="aspect-square w-full overflow-hidden bg-gray-50">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardHeader className="p-4 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{title}</h3>
          <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20 transition-colors">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-primary">{formattedPrice}</p>
          <p className="text-sm text-muted-foreground">Size: {size}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 bg-card/50">
        <Button 
          className="w-full btn-hover bg-gradient-blue flex items-center justify-center gap-2"
          onClick={handleContact}
        >
          <Phone size={16} /> Contact for Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ElectronicsCard;

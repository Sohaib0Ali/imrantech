import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Download, ExternalLink } from "lucide-react";

export interface SoftwareProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  download_link?: string | null;
}

interface SoftwareCardProps {
  software: SoftwareProps;
}

const SoftwareCard = ({ software }: SoftwareCardProps) => {
  const { title, description, imageUrl, category, download_link } = software;
  const { isAdmin } = useAuth();

  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-lg group">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
      </div>
      <CardHeader className="p-4 bg-card/50 backdrop-blur-sm">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{title}</h3>
          <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 transition-colors">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end bg-card/50">
        {isAdmin && download_link ? (
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
              onClick={() => window.open(`https://wa.me/+966537532084?text=I'm interested in ${title}`, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" /> Contact
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={() => window.open(download_link, "_blank")}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all"
            onClick={() => window.open(`https://wa.me/+966537532084?text=I'm interested in ${title}`, "_blank")}
          >
            Contact for Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SoftwareCard;

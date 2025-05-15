
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@/types/database";
import renderIcon from "@/utils/iconMapping";

export type ServiceProps = {
  id: string;
  title: string;
  description: string;
  icon_name: string;
};

type ServiceCardProps = {
  service: ServiceProps;
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary/50 border-2 overflow-hidden group h-full">
      <CardContent className="p-0">
        <div className="p-6 flex flex-col h-full relative">
          <div className="bg-gradient-blue text-white rounded-full w-14 h-14 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-md">
            {service.icon_name && renderIcon(service.icon_name, "h-6 w-6")}
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
          <p className="text-gray-600 flex-grow">{service.description}</p>
          
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/5 rounded-full -ml-10 -mb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;

import { useEffect, useState } from "react";
import SoftwareCard from "./SoftwareCard";
import { supabase } from "@/integrations/supabase/client";
import { SoftwareProduct } from "@/types/database";
import { Loader2 } from "lucide-react";

const FeaturedProducts = () => {
  const [featuredSoftware, setFeaturedSoftware] = useState<SoftwareProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        // Fetch software products
        const { data: softwareData } = await supabase
          .from('software_products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
          
        setFeaturedSoftware(softwareData || []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSoftware.length > 0 ? (
            featuredSoftware.map((software) => (
              <SoftwareCard key={software.id} software={{
                id: software.id,
                title: software.title,
                description: software.description,
                category: software.category,
                imageUrl: software.image_url || ''
              }} />
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No software found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;

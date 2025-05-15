
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SoftwareCard from "./SoftwareCard";
import ElectronicsCard from "./ElectronicsCard";
import { supabase } from "@/integrations/supabase/client";
import { SoftwareProduct, ElectronicsProduct } from "@/types/database";
import { Loader2 } from "lucide-react";

const FeaturedProducts = () => {
  const [featuredSoftware, setFeaturedSoftware] = useState<SoftwareProduct[]>([]);
  const [featuredElectronics, setFeaturedElectronics] = useState<ElectronicsProduct[]>([]);
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
        
        // Fetch electronics products
        const { data: electronicsData } = await supabase
          .from('electronics_products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
          
        setFeaturedSoftware(softwareData || []);
        setFeaturedElectronics(electronicsData || []);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);

  return (
    <section className="section-padding container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Tabs defaultValue="software" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="software">Software</TabsTrigger>
              <TabsTrigger value="electronics">Electronics</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="software" className="animate-fade-in">
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
                  <p className="text-gray-500">No software products found.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="electronics" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredElectronics.length > 0 ? (
                featuredElectronics.map((product) => (
                  <ElectronicsCard key={product.id} product={{
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    size: product.size,
                    imageUrl: product.image_url || ''
                  }} />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No electronics products found.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </section>
  );
};

export default FeaturedProducts;

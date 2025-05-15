
import { useState, useEffect } from "react";
import SoftwareCard from "@/components/SoftwareCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { SoftwareProduct } from "@/types/database";
import { softwareMockData } from "@/data/mockData";
import { Loader2, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Software = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState<SoftwareProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch software products from Supabase
        const { data, error } = await supabase
          .from('software_products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Convert data to SoftwareProduct type
        const fetchedProducts = data as SoftwareProduct[] || [];
        
        // Use mock data if no products are found
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          // Convert mock data to match SoftwareProduct structure
          const mockProducts: SoftwareProduct[] = softwareMockData.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            image_url: item.imageUrl,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }));
          setProducts(mockProducts);
        }
        
        // Extract unique categories
        const allCategories = fetchedProducts.length > 0 
          ? fetchedProducts.map(item => item.category)
          : softwareMockData.map(item => item.category);
        
        setCategories(["All", ...new Set(allCategories)]);
      } catch (error) {
        console.error("Error fetching software products:", error);
        toast({
          title: "Error fetching products",
          description: "Could not load products. Falling back to sample data.",
          variant: "destructive"
        });
        
        // Fallback to mock data with proper structure
        const mockProducts: SoftwareProduct[] = softwareMockData.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          image_url: item.imageUrl,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
        setProducts(mockProducts);
        setCategories(["All", ...new Set(softwareMockData.map(item => item.category))]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter software based on search term and category
  const filteredSoftware = products.filter((software) => {
    const matchesSearch = software.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      software.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === "" || selectedCategory === "All" || software.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto section-padding min-h-screen">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-blue text-transparent bg-clip-text">Software Library</h1>
        <p className="text-gray-600">
          Explore our collection of premium software solutions. Browse by category or search for specific software to find what you need.
        </p>
      </div>

      <div className="bg-card shadow-lg rounded-lg p-6 mb-10 border-2 border-border hover:border-primary/30 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Label htmlFor="search" className="font-medium">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search software..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 focus:border-primary focus:ring-primary rounded-lg shadow-sm hover:border-primary/70 transition-all"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="category" className="font-medium">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category" className="border-2 focus:border-primary focus:ring-primary rounded-lg shadow-sm hover:border-primary/70 transition-all">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : filteredSoftware.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-medium mb-2">No software found</h3>
          <p className="text-gray-500">Try different search terms or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSoftware.map((software, index) => (
            <div 
              key={software.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <SoftwareCard software={{
                id: software.id,
                title: software.title,
                description: software.description,
                category: software.category,
                imageUrl: software.image_url || '',
                download_link: software.download_link
              }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Software;

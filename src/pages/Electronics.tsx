import { useState, useEffect } from "react";
import ElectronicsCard from "@/components/ElectronicsCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { ElectronicsProduct } from "@/types/database";
import { electronicsMockData } from "@/data/mockData";
import { Loader2, Search, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Electronics = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [products, setProducts] = useState<ElectronicsProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Fetch electronics products from Supabase
        const { data, error } = await supabase
          .from('electronics_products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Convert data to ElectronicsProduct type
        const fetchedProducts = data as ElectronicsProduct[] || [];
        
        // Use mock data if no products are found
        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
        } else {
          // Convert mock data to match ElectronicsProduct structure
          const mockProducts: ElectronicsProduct[] = electronicsMockData.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            price: item.price,
            size: item.size,
            image_url: item.imageUrl,
            download_link: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }));
          setProducts(mockProducts);
        }
        
        // Extract unique categories and min/max prices
        const finalProducts = fetchedProducts.length > 0 ? fetchedProducts : 
          electronicsMockData.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            category: item.category,
            price: item.price,
            size: item.size,
            image_url: item.imageUrl,
            download_link: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }));
          
        const allCategories = finalProducts.map(item => item.category);
        setCategories(["All", ...new Set(allCategories)]);
        
        // Get min and max price
        const min = Math.min(...finalProducts.map((product) => product.price));
        const max = Math.max(...finalProducts.map((product) => product.price));
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange([min, max]);
      } catch (error) {
        console.error("Error fetching electronics products:", error);
        toast({
          title: "Error fetching products",
          description: "Could not load products. Falling back to sample data.",
          variant: "destructive"
        });
        
        // Fallback to mock data with proper structure
        const mockProducts: ElectronicsProduct[] = electronicsMockData.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          price: item.price,
          size: item.size,
          image_url: item.imageUrl,
          download_link: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
        setProducts(mockProducts);
        setCategories(["All", ...new Set(electronicsMockData.map(item => item.category))]);
        
        const min = Math.min(...mockProducts.map((product) => product.price));
        const max = Math.max(...mockProducts.map((product) => product.price));
        setMinPrice(min);
        setMaxPrice(max);
        setPriceRange([min, max]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term, category and price
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = 
      selectedCategory === "" || 
      selectedCategory === "All" || 
      product.category === selectedCategory;

    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="container mx-auto section-padding min-h-screen">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-blue text-transparent bg-clip-text">Electronics Shop</h1>
        <p className="text-gray-600">
          Browse our selection of high-quality electronic products including LEDs, TVs, and screens. Contact us directly to inquire about any product.
        </p>
      </div>

      <div className="bg-card shadow-md rounded-lg p-6 mb-10 border-2 border-border hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Filter Products</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-5">
            <Label htmlFor="search" className="font-medium">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 focus:border-primary focus:ring-primary rounded-lg shadow-sm hover:border-primary/70 transition-all"
              />
            </div>
          </div>
          <div className="md:col-span-3">
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
          <div className="md:col-span-4">
            <Label htmlFor="price-range" className="mb-2 block font-medium">
              Price Range: ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
            </Label>
            <Slider
              id="price-range"
              defaultValue={[minPrice, maxPrice]}
              min={minPrice}
              max={maxPrice}
              step={10}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="my-4"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-500">Try different search terms or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ElectronicsCard product={{
                id: product.id,
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                size: product.size,
                imageUrl: product.image_url || '',
                download_link: product.download_link
              }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Electronics;

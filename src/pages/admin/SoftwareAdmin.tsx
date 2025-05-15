
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SoftwareProduct } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Loader2, Pencil, Trash, Plus, Link as LinkIcon } from "lucide-react";

const SoftwareAdmin = () => {
  const [products, setProducts] = useState<SoftwareProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<SoftwareProduct>>({
    title: "",
    description: "",
    category: "",
    image_url: "",
    download_link: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('software_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading products",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}_${file.name}`;
    
    const { error: uploadError, data } = await supabase.storage
      .from('product_images')
      .upload(`software/${fileName}`, file);
      
    if (uploadError) throw uploadError;
    
    const { data: urlData } = supabase.storage
      .from('product_images')
      .getPublicUrl(`software/${fileName}`);
      
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.category) {
        throw new Error("Please fill in all required fields");
      }
      
      let imageUrl = formData.image_url;
      
      // If there's a new image, upload it
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      
      if (isEditing && formData.id) {
        // Update existing product
        const { error } = await supabase
          .from('software_products')
          .update({ 
            title: formData.title,
            description: formData.description,
            category: formData.category,
            image_url: imageUrl,
            download_link: formData.download_link
          })
          .eq('id', formData.id);
          
        if (error) throw error;
        toast({
          title: "Product updated successfully",
          variant: "default"
        });
      } else {
        // Create new product
        const { error } = await supabase
          .from('software_products')
          .insert([{ 
            title: formData.title,
            description: formData.description,
            category: formData.category,
            image_url: imageUrl,
            download_link: formData.download_link
          }]);
          
        if (error) throw error;
        toast({
          title: "Product added successfully",
          variant: "default"
        });
      }
      
      // Reset form and refetch products
      resetForm();
      setSheetOpen(false);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: isEditing ? "Failed to update product" : "Failed to add product",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: SoftwareProduct) => {
    setFormData(product);
    setIsEditing(true);
    setSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const { error } = await supabase
        .from('software_products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Product deleted successfully",
        variant: "default"
      });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Failed to delete product",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      image_url: "",
      download_link: ""
    });
    setIsEditing(false);
    setImageFile(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Software Products</h2>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add New Software
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{isEditing ? "Edit Software Product" : "Add New Software Product"}</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="border-2 focus:border-primary rounded-lg transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="border-2 focus:border-primary rounded-lg transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                  required
                  className="border-2 focus:border-primary rounded-lg transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="download_link" className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" /> Download Link (Admin Only)
                </Label>
                <Input
                  id="download_link"
                  name="download_link"
                  value={formData.download_link || ""}
                  onChange={handleInputChange}
                  placeholder="https://example.com/download"
                  className="border-2 focus:border-primary rounded-lg transition-all"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border-2 focus:border-primary rounded-lg transition-all"
                />
                {formData.image_url && !imageFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Current image:</p>
                    <img 
                      src={formData.image_url} 
                      alt={formData.title} 
                      className="mt-1 max-h-24 rounded border"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEditing ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    isEditing ? "Update Product" : "Add Product"
                  )}
                </Button>
              </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <Card className="border-2 border-dashed hover:border-primary/50 transition-all">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <p className="text-gray-500 mb-4">No software products found.</p>
            <Button onClick={() => setSheetOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" /> Add Your First Product
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto rounded-lg border-2 border-border hover:border-primary/20 transition-all shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Download Link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {product.download_link ? (
                      <a 
                        href={product.download_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline flex items-center"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" /> Link
                      </a>
                    ) : (
                      <span className="text-muted-foreground italic">No link</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(product)}
                        className="hover:border-primary hover:bg-primary/5"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-destructive hover:bg-destructive/10" 
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SoftwareAdmin;

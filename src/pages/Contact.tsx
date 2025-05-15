import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Info, Clock, MapPin, MessageSquare } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you soon.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto section-padding min-h-screen">
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-blue text-transparent bg-clip-text">Contact Us</h1>
        <p className="text-gray-600">
          Have questions or need assistance? Our team is here to help you with all your software and electronics inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <div className="bg-card shadow-lg rounded-xl p-8 border-2 border-border hover:border-primary/50 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">IMRAN Tech Hub</p>
                  <p className="text-muted-foreground">Official Store</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Our Location</p>
                  <p className="text-muted-foreground">Riyadh, Saudi Arabia</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Info className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <a href="mailto:info@imrantechhub.com" className="text-primary hover:underline transition-all">
                    info@imrantechhub.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Opening Hours</p>
                  <p className="text-muted-foreground">Mon-Sat: 9AM-6PM</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-500 p-3 rounded-full mr-4">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <a 
                    href="https://wa.me/+966537532084" 
                    className="text-primary hover:underline transition-all"
                  >
                    +966 53 753 2084
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-card shadow-lg rounded-xl p-8 border-2 border-border hover:border-primary/50 transition-all duration-300">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="sohaib ali" 
                            {...field} 
                            className="border-2 focus:border-primary focus:ring-primary rounded-lg shadow-sm hover:border-primary/70 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="email@example.com" 
                            type="email" 
                            {...field} 
                            className="border-2 focus:border-primary focus:ring-primary rounded-lg shadow-sm hover:border-primary/70 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter subject here" 
                          {...field} 
                          className="border-2 focus:border-primary focus:ring-primary rounded-lg shadow-sm hover:border-primary/70 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your message here" 
                          {...field} 
                          rows={5}
                          className="border-2 focus:border-primary focus:ring-primary rounded-lg shadow-sm hover:border-primary/70 transition-all resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-gradient-blue btn-hover transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

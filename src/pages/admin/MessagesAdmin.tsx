
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ContactMessage } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Loader2, Eye, Trash } from "lucide-react";
import { format } from "date-fns";

const MessagesAdmin = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      toast.error("Error loading messages", {
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setSheetOpen(true);
    
    // Mark as read if not already
    if (!message.is_read) {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .update({ is_read: true })
          .eq('id', message.id);
        
        if (error) throw error;
        
        // Update local state to reflect read status
        setMessages(prev => 
          prev.map(m => 
            m.id === message.id ? { ...m, is_read: true } : m
          )
        );
        
      } catch (error: any) {
        toast.error("Failed to mark message as read", {
          description: error.message
        });
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Message deleted successfully");
      
      // Close sheet if the deleted message is currently selected
      if (selectedMessage?.id === id) {
        setSheetOpen(false);
        setSelectedMessage(null);
      }
      
      fetchMessages();
    } catch (error: any) {
      toast.error("Failed to delete message", {
        description: error.message
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-8">
            <p className="text-gray-500 mb-4">No messages found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id} className={!message.is_read ? "font-medium bg-muted/30" : ""}>
                  <TableCell>
                    {!message.is_read ? (
                      <Badge variant="default">New</Badge>
                    ) : (
                      <Badge variant="outline">Read</Badge>
                    )}
                  </TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.subject}</TableCell>
                  <TableCell>{format(new Date(message.created_at), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-500" 
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            {selectedMessage && (
              <SheetContent className="sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>{selectedMessage.subject}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">From:</h4>
                      <p>{selectedMessage.name}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Email:</h4>
                      <p>{selectedMessage.email}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Date:</h4>
                    <p>{format(new Date(selectedMessage.created_at), "PPpp")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Message:</h4>
                    <div className="mt-2 p-4 bg-muted rounded-md whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setSheetOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                    >
                      Delete Message
                    </Button>
                  </div>
                </div>
              </SheetContent>
            )}
          </Sheet>
        </div>
      )}
    </div>
  );
};

export default MessagesAdmin;

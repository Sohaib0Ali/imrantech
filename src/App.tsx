import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Software from "./pages/Software";
import Electronics from "./pages/Electronics";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";

// Admin routes
import AdminDashboard from "./pages/admin/Dashboard";
import SoftwareAdmin from "./pages/admin/SoftwareAdmin";
import ElectronicsAdmin from "./pages/admin/ElectronicsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/software" element={<Software />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<AdminDashboard />}>
                  <Route index element={<SoftwareAdmin />} />
                  <Route path="software" element={<SoftwareAdmin />} />
                  <Route path="electronics" element={<ElectronicsAdmin />} />
                  <Route path="services" element={<ServicesAdmin />} />
                  <Route path="messages" element={<MessagesAdmin />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

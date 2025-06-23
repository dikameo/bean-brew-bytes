
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleBasedDashboard from "./components/RoleBasedDashboard";
import CoffeeCatalog from "./pages/CoffeeCatalog";
import CoffeeDetail from "./pages/CoffeeDetail";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<RoleBasedDashboard />} />
            <Route path="/roaster" element={<RoleBasedDashboard />} />
            <Route path="/buyer" element={<RoleBasedDashboard />} />
            <Route path="/admin" element={<RoleBasedDashboard />} />
            <Route path="/catalog" element={<CoffeeCatalog />} />
            <Route path="/coffee/:id" element={<CoffeeDetail />} />
            <Route path="/orders" element={<OrderTracking />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;

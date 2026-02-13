import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NavCategoryLandingPage from "./pages/NavCategoryLanding";
import NavCategoryPage from "./pages/NavCategory";
import NotFound from "./pages/NotFound";
import BuyLanding from "./pages/BuyLanding";
import BuyFeaturePage from "./pages/BuyFeature";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Buy: 2-step landing (features -> options) */}
          <Route path="/nav/buy" element={<BuyLanding />} />
          <Route path="/nav/buy/:feature" element={<BuyFeaturePage />} />

          <Route path="/nav/:category" element={<NavCategoryLandingPage />} />
          <Route path="/nav/:category/:option" element={<NavCategoryPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
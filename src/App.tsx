import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BuyLanding from "./pages/BuyLanding";
import BuyFeaturePage from "./pages/BuyFeature";
import NavFeatureLandingPage from "./pages/NavFeatureLanding";
import NavFeatureOptionsPage from "./pages/NavFeatureOptions";
import NavCategoryPage from "./pages/NavCategory";
import ListYourPropertyPage from "./pages/ListYourProperty";
import PropertyDetailsPage from "./pages/PropertyDetails";
import AdminLoginPage from "./pages/AdminLogin";
import AdminDashboardPage from "./pages/AdminDashboard";
import AdminPropertiesPage from "./pages/AdminProperties";
import AdminLeadsPage from "./pages/AdminLeads";
import { AdminGate } from "@/components/admin/AdminGate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/property/:id" element={<PropertyDetailsPage />} />

          <Route path="/list-your-property" element={<ListYourPropertyPage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminGate>
                <AdminDashboardPage />
              </AdminGate>
            }
          />
          <Route
            path="/admin/properties"
            element={
              <AdminGate>
                <AdminPropertiesPage />
              </AdminGate>
            }
          />
          <Route
            path="/admin/leads"
            element={
              <AdminGate>
                <AdminLeadsPage />
              </AdminGate>
            }
          />

          {/* Buy: 2-step landing (features -> options) */}
          <Route path="/nav/buy" element={<BuyLanding />} />
          <Route path="/nav/buy/:feature" element={<BuyFeaturePage />} />

          {/* All other categories: 2-step flow */}
          <Route path="/nav/:category" element={<NavFeatureLandingPage />} />
          <Route
            path="/nav/:category/:feature"
            element={<NavFeatureOptionsPage />}
          />

          {/* Results/listings route (moved to avoid conflicts with feature route) */}
          <Route
            path="/nav/:category/option/:option"
            element={<NavCategoryPage />}
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
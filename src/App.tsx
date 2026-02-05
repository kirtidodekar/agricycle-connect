import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import RoleSelect from "./pages/RoleSelect";
import Auth from "./pages/Auth";

// Farmer Pages
import FarmerOnboarding from "./pages/FarmerOnboarding";
import FarmerDashboard from "./pages/FarmerDashboard";
import CreateListing from "./pages/CreateListing";
import AIAnalysis from "./pages/AIAnalysis";
import ListingDetails from "./pages/ListingDetails";

// Buyer Pages
import BuyerOnboarding from "./pages/BuyerOnboarding";
import BuyerDashboard from "./pages/BuyerDashboard";
import BuyerListingDetail from "./pages/BuyerListingDetail";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/auth" element={<Auth />} />

          {/* Farmer Routes */}
          <Route path="/farmer/onboarding" element={<FarmerOnboarding />} />
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/create" element={<CreateListing />} />
          <Route path="/farmer/analyze" element={<AIAnalysis />} />
          <Route path="/farmer/listing-details" element={<ListingDetails />} />
          <Route path="/farmer/listings" element={<FarmerDashboard />} />
          <Route path="/farmer/messages" element={<FarmerDashboard />} />
          <Route path="/farmer/profile" element={<FarmerDashboard />} />

          {/* Buyer Routes */}
          <Route path="/buyer/onboarding" element={<BuyerOnboarding />} />
          <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
          <Route path="/buyer/listing/:id" element={<BuyerListingDetail />} />
          <Route path="/buyer/shortlist" element={<BuyerDashboard />} />
          <Route path="/buyer/messages" element={<BuyerDashboard />} />
          <Route path="/buyer/profile" element={<BuyerDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

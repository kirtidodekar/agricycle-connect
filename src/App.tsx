import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListingsProvider } from "@/context/ListingsContext";

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
import FarmerListings from "./pages/FarmerListings";
import FarmerMessages from "./pages/FarmerMessages";
import FarmerProfile from "./pages/FarmerProfile";

// Buyer Pages
import BuyerOnboarding from "./pages/BuyerOnboarding";
import BuyerDashboard from "./pages/BuyerDashboard";
import BuyerListingDetail from "./pages/BuyerListingDetail";
import BuyerListings from "./pages/BuyerListings";
import BuyerShortlist from "./pages/BuyerShortlist";
import BuyerMessages from "./pages/BuyerMessages";
import BuyerProfile from "./pages/BuyerProfile";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ListingsProvider>
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
            <Route path="/farmer/listing/:id" element={<ListingDetails />} />
            <Route path="/farmer/listings" element={<FarmerListings />} />
            <Route path="/farmer/messages" element={<FarmerMessages />} />
            <Route path="/farmer/messages/:id" element={<FarmerMessages />} />
            <Route path="/farmer/profile" element={<FarmerProfile />} />

            {/* Buyer Routes */}
            <Route path="/buyer/onboarding" element={<BuyerOnboarding />} />
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/listings" element={<BuyerListings />} />
            <Route path="/buyer/listing/:id" element={<BuyerListingDetail />} />
            <Route path="/buyer/shortlist" element={<BuyerShortlist />} />
            <Route path="/buyer/messages" element={<BuyerMessages />} />
            <Route path="/buyer/messages/:id" element={<BuyerMessages />} />
            <Route path="/buyer/profile" element={<BuyerProfile />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ListingsProvider>
  </QueryClientProvider>
);

export default App;

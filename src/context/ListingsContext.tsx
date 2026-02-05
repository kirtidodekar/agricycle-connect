import { createContext, useContext, useState, ReactNode } from "react";

interface Listing {
  id: number;
  title: string;
  quantity: string;
  unit: string;
  price: string;
  description: string;
  availability: string;
  quality: string;
  confidence?: number;
  location: string;
  farmerName: string;
  date: string;
  status: "active" | "sold" | "draft";
  image?: string;
  isBookmarked?: boolean;
  inquiries?: number;
}

interface ListingsContextType {
  farmerListings: Listing[];
  buyerListings: Listing[];
  addListing: (listing: Omit<Listing, "id" | "date" | "status" | "inquiries">) => void;
  updateListing: (id: number, updates: Partial<Listing>) => void;
  toggleBookmark: (id: number) => void;
  getListingsByFarmer: (farmerName: string) => Listing[];
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

const sampleFarmerListings: Listing[] = [
  {
    id: 1,
    title: "Rice Husk",
    quantity: "500",
    unit: "kg",
    price: "5",
    description: "Fresh rice husk from recent harvest",
    availability: "immediate",
    quality: "Good",
    location: "Pune, Maharashtra",
    farmerName: "Rajesh Kumar",
    date: "2024-01-15",
    status: "active",
    inquiries: 2,
  },
  {
    id: 2,
    title: "Wheat Straw",
    quantity: "1",
    unit: "ton",
    price: "3",
    description: "High-quality wheat straw, properly dried",
    availability: "immediate",
    quality: "Excellent",
    location: "Pune, Maharashtra",
    farmerName: "Rajesh Kumar",
    date: "2024-01-14",
    status: "active",
    inquiries: 3,
  },
  {
    id: 3,
    title: "Sugarcane Bagasse",
    quantity: "2",
    unit: "tons",
    price: "4",
    description: "Fresh bagasse from sugar mill",
    availability: "weekly",
    quality: "Good",
    location: "Pune, Maharashtra",
    farmerName: "Rajesh Kumar",
    date: "2024-01-10",
    status: "sold",
    inquiries: 5,
  },
];

const sampleBuyerListings: Listing[] = [
  {
    id: 1,
    title: "Rice Husk",
    quantity: "500",
    unit: "kg",
    price: "5",
    description: "Fresh rice husk from recent harvest",
    availability: "immediate",
    quality: "Good",
    confidence: 94,
    location: "Pune, Maharashtra",
    farmerName: "Rajesh Kumar",
    date: "2024-01-15",
    status: "active",
    isBookmarked: false,
  },
  {
    id: 2,
    title: "Wheat Straw",
    quantity: "1",
    unit: "ton",
    price: "3",
    description: "High-quality wheat straw, properly dried",
    availability: "immediate",
    quality: "Excellent",
    confidence: 98,
    location: "Nashik, Maharashtra",
    farmerName: "Amit Patil",
    date: "2024-01-14",
    status: "active",
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Sugarcane Bagasse",
    quantity: "2",
    unit: "tons",
    price: "4",
    description: "Fresh bagasse from sugar mill",
    availability: "weekly",
    quality: "Good",
    confidence: 91,
    location: "Kolhapur, Maharashtra",
    farmerName: "Suresh Jadhav",
    date: "2024-01-13",
    status: "active",
    isBookmarked: false,
  },
  {
    id: 4,
    title: "Cotton Stalks",
    quantity: "800",
    unit: "kg",
    price: "2",
    description: "Clean cotton stalks from recent harvest",
    availability: "immediate",
    quality: "Average",
    confidence: 85,
    location: "Nagpur, Maharashtra",
    farmerName: "Ramesh Deshmukh",
    date: "2024-01-12",
    status: "active",
    isBookmarked: false,
  },
];

export const ListingsProvider = ({ children }: { children: ReactNode }) => {
  const [farmerListings, setFarmerListings] = useState<Listing[]>(sampleFarmerListings);
  const [buyerListings, setBuyerListings] = useState<Listing[]>(sampleBuyerListings);

  const addListing = (listing: Omit<Listing, "id" | "date" | "status" | "inquiries">) => {
    const newId = Math.max(...farmerListings.map(l => l.id), ...buyerListings.map(l => l.id)) + 1;
    const newDate = new Date().toISOString().split('T')[0];
    
    const newListing: Listing = {
      ...listing,
      id: newId,
      date: newDate,
      status: "active",
      inquiries: 0,
    };

    // Add to farmer listings
    setFarmerListings(prev => [...prev, newListing]);
    
    // Add to buyer listings (public view)
    setBuyerListings(prev => [...prev, { ...newListing, isBookmarked: false }]);
  };

  const updateListing = (id: number, updates: Partial<Listing>) => {
    // Update farmer listings
    setFarmerListings(prev => 
      prev.map(listing => 
        listing.id === id ? { ...listing, ...updates } : listing
      )
    );
    
    // Update buyer listings
    setBuyerListings(prev => 
      prev.map(listing => 
        listing.id === id ? { ...listing, ...updates } : listing
      )
    );
  };

  const toggleBookmark = (id: number) => {
    setBuyerListings(prev => 
      prev.map(listing => 
        listing.id === id 
          ? { ...listing, isBookmarked: !listing.isBookmarked } 
          : listing
      )
    );
  };

  const getListingsByFarmer = (farmerName: string) => {
    return farmerListings.filter(listing => listing.farmerName === farmerName);
  };

  return (
    <ListingsContext.Provider
      value={{
        farmerListings,
        buyerListings,
        addListing,
        updateListing,
        toggleBookmark,
        getListingsByFarmer,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error("useListings must be used within a ListingsProvider");
  }
  return context;
};
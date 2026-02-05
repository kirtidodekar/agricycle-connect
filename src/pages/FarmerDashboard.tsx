import { Link } from "react-router-dom";
import { Plus, Camera, Bell, TrendingUp, Package, MessageSquare, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import Logo from "@/components/Logo";
import FarmerBottomNav from "@/components/FarmerBottomNav";

const FarmerDashboard = () => {
  const stats = [
    { value: "3", label: "Active Listings", icon: <Package className="w-5 h-5 text-primary" />, variant: "primary" as const },
    { value: "5", label: "Buyer Inquiries", icon: <MessageSquare className="w-5 h-5 text-secondary" />, variant: "secondary" as const },
    { value: "₹12,500", label: "Estimated Earnings", icon: <TrendingUp className="w-5 h-5 text-accent" />, variant: "accent" as const },
  ];

  const recentListings = [
    { id: 1, name: "Rice Husk", quantity: "500 kg", status: "active", inquiries: 2, price: "₹5/kg" },
    { id: 2, name: "Wheat Straw", quantity: "1 ton", status: "active", inquiries: 3, price: "₹3/kg" },
    { id: 3, name: "Sugarcane Bagasse", quantity: "2 tons", status: "contacted", inquiries: 5, price: "₹4/kg" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-primary px-4 pt-safe-top">
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-primary-foreground/70 text-sm">Welcome back,</p>
            <h1 className="text-xl font-bold text-primary-foreground">Rajesh Kumar</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-primary-foreground" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full" />
            </button>
          </div>
        </div>

        {/* Impact Banner */}
        <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 mb-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
            <Leaf className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-primary-foreground font-semibold">Your Impact</p>
            <p className="text-primary-foreground/70 text-sm">2.5 tons of waste reused • ₹8,500 earned</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              variant={stat.variant}
              className="p-4"
            />
          ))}
        </div>

        {/* Create Listing CTA */}
        <Link
          to="/farmer/create"
          className="block bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 shadow-elevated hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary-foreground/20 flex items-center justify-center">
              <Camera className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-primary-foreground">Create New Listing</h3>
              <p className="text-primary-foreground/70 text-sm">Snap a photo of your waste</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <Plus className="w-5 h-5 text-accent-foreground" />
            </div>
          </div>
        </Link>

        {/* Recent Listings */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Listings</h2>
            <Link to="/farmer/listings" className="text-sm text-primary font-medium flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentListings.map((listing) => (
              <Link
                key={listing.id}
                to={`/farmer/listing/${listing.id}`}
                className="block bg-card rounded-xl p-4 shadow-card flex items-center gap-4 hover:shadow-elevated transition-all hover:-translate-y-0.5"
              >
                <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center">
                  <Package className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{listing.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {listing.quantity} • {listing.price}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    listing.status === "active" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-secondary/10 text-secondary"
                  }`}>
                    {listing.inquiries} inquiries
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <FarmerBottomNav />
    </div>
  );
};

export default FarmerDashboard;

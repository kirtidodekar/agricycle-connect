import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Phone, Mail, ArrowRight, Eye, EyeOff, Tractor, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "farmer";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isSignUp, setIsSignUp] = useState(false);
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    name: "",
    otp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate auth
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: isSignUp ? "Account created!" : "Welcome back!",
      description: "Redirecting to your dashboard...",
    });

    // Navigate based on role
    if (role === "farmer") {
      navigate(isSignUp ? "/farmer/onboarding" : "/farmer/dashboard");
    } else {
      navigate(isSignUp ? "/buyer/onboarding" : "/buyer/dashboard");
    }

    setIsLoading(false);
  };

  const RoleIcon = role === "farmer" ? Tractor : Building2;

  return (
    <div className="min-h-screen bg-gradient-warm flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Logo />
          <Link to="/role-select" className="text-sm text-muted-foreground hover:text-foreground">
            Change role
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Role Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`p-2 rounded-xl ${role === "farmer" ? "bg-primary/10" : "bg-secondary/10"}`}>
              <RoleIcon className={`w-5 h-5 ${role === "farmer" ? "text-primary" : "text-secondary"}`} />
            </div>
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {role} Account
            </span>
          </div>

          {/* Card */}
          <div className="bg-card rounded-3xl shadow-elevated p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {isSignUp
                  ? "Join thousands of farmers & buyers"
                  : "Sign in to your account"}
              </p>
            </div>

            {/* Auth Method Toggle */}
            <div className="flex bg-muted rounded-xl p-1 mb-6">
              <button
                onClick={() => setAuthMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  authMethod === "phone"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Phone className="w-4 h-4" />
                Phone
              </button>
              <button
                onClick={() => setAuthMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  authMethod === "email"
                    ? "bg-card shadow-sm text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5"
                    required
                  />
                </div>
              )}

              {authMethod === "phone" ? (
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                      +91
                    </span>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-12"
                      required
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1.5">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <Button
                type="submit"
                variant={role === "farmer" ? "farmer" : "buyer"}
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Toggle Sign In/Up */}
            <p className="text-center mt-6 text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-primary font-semibold hover:underline"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;

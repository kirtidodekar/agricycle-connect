import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Upload, X, Image as ImageIcon, ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FarmerBottomNav from "@/components/FarmerBottomNav";

const CreateListing = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(true);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsCapturing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = () => {
    // Simulate camera capture
    fileInputRef.current?.click();
  };

  const handleAnalyze = () => {
    navigate("/farmer/analyze", { state: { image: selectedImage } });
  };

  const tips = [
    "Good lighting helps AI accuracy",
    "Show the full waste pile",
    "Include something for scale",
  ];

  return (
    <div className="min-h-screen bg-foreground flex flex-col">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Header */}
      <header className="bg-foreground/95 backdrop-blur-md px-4 py-4 flex items-center justify-between z-10">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-background" />
        </button>
        <h1 className="text-lg font-semibold text-background">Create Listing</h1>
        <button className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-background" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {selectedImage ? (
          /* Image Preview */
          <div className="flex-1 relative">
            <img
              src={selectedImage}
              alt="Selected waste"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => {
                setSelectedImage(null);
                setIsCapturing(true);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground/80 flex items-center justify-center"
            >
              <X className="w-5 h-5 text-background" />
            </button>
          </div>
        ) : (
          /* Camera View */
          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-foreground to-foreground/90 p-6">
            <div className="w-full max-w-sm aspect-[4/5] rounded-3xl border-2 border-dashed border-background/30 flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 rounded-2xl bg-background/10 flex items-center justify-center mb-6">
                <Camera className="w-10 h-10 text-background/70" />
              </div>
              <h2 className="text-xl font-semibold text-background text-center mb-2">
                Capture Your Waste
              </h2>
              <p className="text-background/60 text-center text-sm mb-6">
                Take a clear photo of your agricultural waste
              </p>

              {/* Tips */}
              <div className="w-full space-y-2">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-background/60"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="bg-foreground p-6 space-y-4 safe-bottom">
          {selectedImage ? (
            <Button variant="hero" size="xl" onClick={handleAnalyze} className="w-full">
              <ImageIcon className="w-5 h-5" />
              Analyze with AI
            </Button>
          ) : (
            <>
              <Button variant="hero" size="xl" onClick={handleCapture} className="w-full">
                <Camera className="w-5 h-5" />
                Take Photo
              </Button>
              <Button
                variant="ghost"
                className="w-full text-background/70 hover:text-background hover:bg-background/10"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-5 h-5" />
                Upload from Gallery
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateListing;

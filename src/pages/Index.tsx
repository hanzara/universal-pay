import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { WalletSection } from "@/components/sections/WalletSection";
import { PaymentChannelsSection } from "@/components/sections/PaymentChannelsSection";
import { AnalyticsSection } from "@/components/sections/AnalyticsSection";
import { TreasurySection } from "@/components/sections/TreasurySection";
import { PaymentsSection } from "@/components/sections/PaymentsSection";
import { IntelligenceSection } from "@/components/sections/IntelligenceSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { DeveloperHubSection } from "@/components/sections/DeveloperHubSection";
import { SettingsSection } from "@/components/sections/SettingsSection";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dashboard">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-dashboard">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Welcome to Universal Pay</h1>
          <p className="text-white/80">Please sign in to continue</p>
          <Button onClick={() => navigate("/auth")}>
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />;
      case "treasury":
        return <TreasurySection />;
      case "payments":
        return <PaymentsSection />;
      case "intelligence":
        return <IntelligenceSection />;
      case "integrations":
        return <IntegrationsSection />;
      case "developer":
        return <DeveloperHubSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-dashboard">
        <AppSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
        
        <div className="flex-1 flex flex-col">
          {/* Header with mobile trigger */}
          <header className="h-14 flex items-center border-b border-border bg-background/95 backdrop-blur px-4 lg:hidden">
            <SidebarTrigger className="mr-2" />
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-md"></div>
              <span className="font-bold">Universal Pay</span>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              {renderActiveSection()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;

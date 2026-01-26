import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Loader2 } from "lucide-react";

// Lazy load admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));

const queryClient = new QueryClient();

const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-muted/30">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={
              <Suspense fallback={<AdminLoader />}>
                <AdminLogin />
              </Suspense>
            } />
            <Route path="/admin" element={
              <Suspense fallback={<AdminLoader />}>
                <AdminDashboard />
              </Suspense>
            } />
            <Route path="/admin/leads" element={
              <Suspense fallback={<AdminLoader />}>
                <AdminLeads />
              </Suspense>
            } />
            <Route path="/admin/analytics" element={
              <Suspense fallback={<AdminLoader />}>
                <AdminAnalytics />
              </Suspense>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

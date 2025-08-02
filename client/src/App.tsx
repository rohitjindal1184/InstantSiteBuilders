import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
// Analytics library still available for tracking events and page views
import { useAnalytics } from "./hooks/use-analytics";
import { Analytics } from '@vercel/analytics/react';

function Router() {
  // Track page views when routes change
  useAnalytics();
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Google Analytics is now loaded via HTML head script tags
  // No need for programmatic initialization since gtag is already configured

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Analytics />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

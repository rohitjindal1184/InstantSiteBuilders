import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TourTriggerProps {
  onStartTour: () => void;
}

export default function TourTrigger({ onStartTour }: TourTriggerProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(false);

  useEffect(() => {
    // Check if user has seen the tour before
    const tourSeen = localStorage.getItem("onboarding-tour-seen");
    if (tourSeen) {
      setHasSeenTour(true);
    } else {
      // Show prompt after a short delay for new users
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleStartTour = () => {
    setShowPrompt(false);
    localStorage.setItem("onboarding-tour-seen", "true");
    setHasSeenTour(true);
    onStartTour();
  };

  const handleDismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem("onboarding-tour-seen", "true");
    setHasSeenTour(true);
  };

  return (
    <>
      {/* Floating help button for returning users */}
      {hasSeenTour && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            onClick={onStartTour}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300"
            title="Take a tour of the website"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </motion.div>
      )}

      {/* Tour prompt for new users */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            className="fixed top-6 right-6 z-50 max-w-sm"
            initial={{ opacity: 0, x: 100, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 relative">
              {/* Animated attention grabber */}
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Play className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    First time here?
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Take a quick tour to see how we can build your free website!
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={handleStartTour}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1"
                    >
                      Start Tour
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleDismissPrompt}
                      className="text-gray-500 text-xs px-3 py-1"
                    >
                      No thanks
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
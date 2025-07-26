import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, ArrowRight, ArrowLeft, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TourStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position: "top" | "bottom" | "left" | "right";
  actionText?: string;
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to InstantSiteBuilders!",
    description: "Let's take a quick tour to show you how we can help build your dream website for free.",
    targetSelector: ".hero-section",
    position: "bottom",
    actionText: "Start Tour"
  },
  {
    id: "services",
    title: "Our Free Services",
    description: "Discover our range of free website building services designed for individuals and small businesses.",
    targetSelector: ".services-section",
    position: "top"
  },
  {
    id: "features",
    title: "Key Features",
    description: "See what makes our websites stand out - fast loading, mobile-friendly, and professionally designed.",
    targetSelector: ".features-section",
    position: "top"
  },
  {
    id: "testimonials",
    title: "Happy Customers",
    description: "Read what our satisfied customers say about their free websites and our service quality.",
    targetSelector: ".testimonials-section",
    position: "top"
  },
  {
    id: "contact",
    title: "Get Started Today",
    description: "Ready to get your free website? Fill out our contact form and we'll get back to you within 24 hours!",
    targetSelector: ".contact-section",
    position: "top",
    actionText: "Get My Free Website"
  }
];

interface OnboardingTourProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function OnboardingTour({ isVisible, onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const currentStepData = tourSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === tourSteps.length - 1;

  useEffect(() => {
    if (!isVisible) return;

    const updateTooltipPosition = () => {
      const element = document.querySelector(currentStepData.targetSelector) as HTMLElement;
      if (!element) return;

      setTargetElement(element);
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

      let x = 0;
      let y = 0;

      switch (currentStepData.position) {
        case "top":
          x = rect.left + scrollLeft + rect.width / 2;
          y = rect.top + scrollTop - 20;
          break;
        case "bottom":
          x = rect.left + scrollLeft + rect.width / 2;
          y = rect.bottom + scrollTop + 20;
          break;
        case "left":
          x = rect.left + scrollLeft - 20;
          y = rect.top + scrollTop + rect.height / 2;
          break;
        case "right":
          x = rect.right + scrollLeft + 20;
          y = rect.top + scrollTop + rect.height / 2;
          break;
      }

      setTooltipPosition({ x, y });

      // Scroll element into view smoothly
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "center",
        inline: "center"
      });
    };

    updateTooltipPosition();
    window.addEventListener("resize", updateTooltipPosition);
    window.addEventListener("scroll", updateTooltipPosition);

    return () => {
      window.removeEventListener("resize", updateTooltipPosition);
      window.removeEventListener("scroll", updateTooltipPosition);
    };
  }, [currentStep, currentStepData, isVisible]);

  useEffect(() => {
    if (!isVisible || !targetElement) return;

    // Add highlight effect to target element
    targetElement.style.position = "relative";
    targetElement.style.zIndex = "1001";
    targetElement.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 8px rgba(59, 130, 246, 0.2)";
    targetElement.style.borderRadius = "8px";
    targetElement.style.transition = "all 0.3s ease";

    return () => {
      if (targetElement) {
        targetElement.style.position = "";
        targetElement.style.zIndex = "";
        targetElement.style.boxShadow = "";
        targetElement.style.borderRadius = "";
        targetElement.style.transition = "";
      }
    };
  }, [targetElement, isVisible]);

  const handleNext = () => {
    if (isLastStep) {
      // On last step, scroll to contact form and focus on it
      const contactForm = document.querySelector(".contact-form");
      contactForm?.scrollIntoView({ behavior: "smooth", block: "center" });
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-1000">
        {/* Overlay */}
        <motion.div
          ref={overlayRef}
          className="absolute inset-0 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Tooltip */}
        <motion.div
          className="absolute"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: `translate(${
              currentStepData.position === "left" ? "-100%" : 
              currentStepData.position === "right" ? "0%" : "-50%"
            }, ${
              currentStepData.position === "top" ? "-100%" : 
              currentStepData.position === "bottom" ? "0%" : "-50%"
            })`,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="w-80 shadow-xl border-2 border-blue-200 bg-white relative">
            {/* Arrow pointer */}
            <div
              className={`absolute w-0 h-0 ${
                currentStepData.position === "top"
                  ? "bottom-[-8px] left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"
                  : currentStepData.position === "bottom"
                  ? "top-[-8px] left-1/2 transform -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"
                  : currentStepData.position === "left"
                  ? "right-[-8px] top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"
                  : "left-[-8px] top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"
              }`}
            />

            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-blue-600">
                    Step {currentStep + 1} of {tourSteps.length}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Content */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {currentStepData.description}
                </p>
              </motion.div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((currentStep + 1) / tourSteps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isFirstStep}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                <div className="flex space-x-2">
                  {!isLastStep && (
                    <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
                      Skip Tour
                    </Button>
                  )}
                  <Button onClick={handleNext} className="flex items-center space-x-2">
                    {isFirstStep && <Play className="h-4 w-4" />}
                    <span>
                      {currentStepData.actionText || (isLastStep ? "Finish" : "Next")}
                    </span>
                    {!isFirstStep && !isLastStep && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
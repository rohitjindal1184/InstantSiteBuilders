import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface PayPalButtonProps {
  amount: string;
  currency: string;
  intent: string;
  buttonId?: string;
}

export default function PayPalButton({
  amount,
  currency,
  intent,
  buttonId = "paypal-button",
}: PayPalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayPalClick = async () => {
    setIsLoading(true);
    try {
      // Create PayPal order
      const response = await fetch("/paypal/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          currency: currency,
          intent: intent,
        }),
      });
      
      const order = await response.json();
      
      if (order.id) {
        // Find the approval URL from PayPal response
        const approvalUrl = order.links?.find((link: any) => link.rel === "approve")?.href;
        
        if (approvalUrl) {
          // Redirect to PayPal for payment approval
          window.open(approvalUrl, '_blank');
        } else {
          throw new Error("No approval URL found");
        }
      } else {
        throw new Error("Failed to create PayPal order");
      }
    } catch (error) {
      console.error("PayPal payment error:", error);
      alert("Payment initialization failed. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayPalClick}
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
    >
      {isLoading ? (
        <span>Processing...</span>
      ) : (
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.514.893 5.635 2.513.9 1.296 1.05 2.849.42 4.377-.63 1.528-1.65 2.685-2.87 3.251-.93.43-1.998.647-3.17.647H9.68a.641.641 0 0 0-.633.74l-.744 4.71a.641.641 0 0 1-.633.573H7.076z"/>
          </svg>
          Pay {currency} {amount}
        </span>
      )}
    </Button>
  );
}
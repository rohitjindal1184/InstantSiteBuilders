import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface PayPalButtonProps {
  amount: string;
  currency: string;
  intent: string;
}

export default function PayPalButton({
  amount,
  currency,
  intent,
}: PayPalButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  const createOrder = async () => {
    try {
      const orderPayload = {
        amount: amount,
        currency: currency,
        intent: intent,
      };
      const response = await fetch("/paypal/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const output = await response.json();
      return output;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const handlePayPalClick = async () => {
    setIsLoading(true);
    try {
      // For now, just redirect to contact form
      // In a real implementation, this would integrate with PayPal
      const element = document.getElementById("contact");
      if (element) {
        const offset = 80;
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });
      }
      alert(`PayPal payment for ${currency} ${amount} - Please contact us to complete your order!`);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment error. Please try again or contact support.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayPalClick}
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
    >
      {isLoading ? "Processing..." : `Pay ${currency} ${amount} with PayPal`}
    </Button>
  );
}
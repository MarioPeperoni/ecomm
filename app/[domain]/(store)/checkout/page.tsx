"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { format } from "date-fns";

import getAproxDelivery from "@/helpers/getAproxDelivery";

import { useCart } from "@/hooks/use-cart";

import LoadingDots from "@/components/loading/LoadingDots";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";

import { Truck } from "lucide-react";

export default function CheckoutPage() {
  const [success, setSuccess] = useState<boolean | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cart = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkoutAction = async () => {
      console.log("RUN CHECKOUT ACTION");
      //   const response = await checkout(cart.items);
      //   if (response.url) {
      //     window.location.href = response.url;
      //   } else {
      //     setError(response.error);
      //   }
    };

    if (!(searchParams.get("success") || searchParams.get("orderId"))) {
      checkoutAction();
    }
  }, [searchParams]);

  useEffect(() => {
    const successParam = searchParams.get("success");
    const orderIdParam = searchParams.get("orderId");
    const errorParam = searchParams.get("error");
    if (successParam) {
      if (successParam === "true") {
        cart.clearCart();
      }
      setSuccess(successParam === "true");
      setOrderId(orderIdParam || null);
      setError(errorParam || null);
    }
  }, [searchParams]);

  // Dynamic content rendering based on the success state
  let content;

  if (success === null && !error) {
    content = (
      <div className="text-center">
        <p className="text-lg font-medium text-muted-foreground">
          You will be redirected to the payment processor shortly...
        </p>
        <LoadingDots dotsStyle="w-4 h-4" containterStyle="mt-6" />
      </div>
    );
  } else if (success) {
    const deliveryDate = getAproxDelivery();
    content = (
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-green-700">
          Payment Confirmed!
        </h1>
        <p className="mt-4 text-muted-foreground">
          Thank you for shopping with us! Your order ID is{" "}
          <span className="font-semibold text-green-700">{orderId}</span>.
        </p>
        <div className="mt-2 text-muted-foreground">
          <p className="flex items-center gap-2">
            <Truck className="text-green-700" />
            <span>Your package is expected to arrive between:</span>
            <span className="font-semibold">
              {format(deliveryDate[0], "iii dd MMM")} -{" "}
              {format(deliveryDate[1], "iii dd MMM")}
            </span>
          </p>
        </div>
        <Button
          className="mt-6 bg-green-700 px-6 hover:bg-green-600"
          onClick={() => (window.location.href = "/")}
        >
          Back to Homepage
        </Button>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-destructive">Payment Failed</h1>
        <p className="mt-4 text-muted-foreground">
          Something went wrong with your payment. Please try again or contact
          support.
        </p>
        <code className="font-mono">{error}</code>
        <Button
          className="mt-6 bg-destructive px-6 hover:bg-destructive/80"
          onClick={() => (window.location.href = "/cart")}
        >
          Back to Cart
        </Button>
      </div>
    );
  }

  return (
    <Container>
      <div className="p-10">{content}</div>
    </Container>
  );
}

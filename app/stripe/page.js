"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { paysteckPayment } from "../api/api";

const StripePayment = (props) => {
  const {
    amount,
    jobId,
    mileid,
    disableMakePayment,
    contractId,
    paymentStatu,
  } = props;
  const [error, setError] = useState(null);

  const handler = async () => {
    try {
      const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Failed to load Stripe.");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/stripe/checkoutsession`,
        {
          method: "POST",
          body: JSON.stringify({ amount, mileid, jobId, contractId }),
          headers: { "Content-Type": "application/json" },
        }
      );
      setError(res.error);
      if (!res.ok) throw new Error("Failed to create session.");

      const { sessionId } = await res.json();

      if (typeof window !== "undefined") {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Stripe error:", error);
        } else {
          stripe
            .redirectToCheckout({ sessionId })
            .then(async function (result) {
              if (result.error) {
                console.error("Stripe redirect error:", result.error);
                setError(result.error.message);
              } else {
                paymentStatu();
                disableMakePayment();
              }
            });
        }
      }
    } catch (error) {
      console.error("Error:", error);
      console.log("error 3", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    handler();
  }, []);

  return (
    <div>
      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default StripePayment;

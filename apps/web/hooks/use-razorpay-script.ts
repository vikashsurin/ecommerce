// apps/web/src/hooks/use-razorpay-script.ts
import { useEffect, useState } from "react";

export function useRazorpayScript() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (document.querySelector("#razorpay-script")) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  return loaded;
}

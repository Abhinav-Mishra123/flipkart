"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";


function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    console.log("script loaded")

    return () => {
      document.body.removeChild(script);
    };
}, []);

  const displayRazorpay = async () => {
    try {
      const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setAmount(subtotal);
      console.log("subtotal", subtotal);
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: subtotal * 100,
            currency: "INR",
        }),
    });
      const order = await response.json();
      console.log("order", order)

      // Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: subtotal * 100,
        currency: "INR",
        name: "AM Store",
        description: "Purchase Order",
        order_id: order.id,
        callback_url: "/api/verify-payment",
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        handler: function (response) {
          fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === "ok") {
                router.push("/payment-success");
              } else {
                alert("Payment verification failed");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("Error verifying payment");
            });
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
      alert("Error creating order");
    }
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is currently empty.</p>
      ) : (
        <>
          <div className="cart-items space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-item flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="w-1/4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-30 object-cover rounded"
                  />
                </div>
                <div className="w-2/4 px-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    Price: ₹{item.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity:{" "}
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="w-12 border border-gray-300 rounded px-2"
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                    />
                  </p>
                </div>
                <div className="w-1/4 text-right">
                  <p className="text-lg font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg">Subtotal:</p>
                <p className="text-lg font-semibold">₹{subtotal.toFixed(2)}</p>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={displayRazorpay}
              >
                Proceed to Checkout
              </button>
              <button
                className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;

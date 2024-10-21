"use client";
import React from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleCheckOut = () =>{
    if(!isLoggedIn){
        router.push("/login")
        console.log("login block")
    }
    else{
        router.push("/checkout")
        console.log("checkout block")
    }
  }

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      {/* If cart is empty */}
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is currently empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="cart-items space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-item flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md"
              >
                {/* Product Image */}
                <div className="w-1/4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-30 object-cover rounded"
                  />
                </div>

                {/* Product Details */}
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

                {/* Item Total and Remove Button */}
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

          {/* Subtotal Section */}
          <div className="cart-summary bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg">Subtotal:</p>
              <p className="text-lg font-semibold">₹{subtotal.toFixed(2)}</p>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleCheckOut}>
              Proceed to Checkout
            </button>
            <button
              className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;

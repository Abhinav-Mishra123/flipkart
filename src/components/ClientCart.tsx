"use client"; // This makes it a client-side component

import { useCart } from "@/context/CartContext";

interface ClientCartProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
}

export default function ClientCart({ productId, productName, productPrice, productImage }: ClientCartProps) {
  const { addToCart } = useCart();

  return (
    <button
      className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-4 rounded font-semibold w-1/2"
      onClick={() =>
        addToCart({
          id: productId,
          name: productName,
          price: productPrice,
          quantity: 1,
          image: productImage,
        })
      }
    >
      Add to Cart
    </button>
  );
}

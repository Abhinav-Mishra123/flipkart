"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { slugify } from "@/app/utils/slugify";
import Shimmer from "@/app/utils/Shimmer";

export default function Productcomponent(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get("/api/shopproduct"); 
        setProducts(response.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching product data:", error.message);
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);
  
  if (loading) {
    return <div>      
    <Shimmer/>
    </div>;
  }
  return (
    <div className="cardList">
      <div className="card-container mt-8">
      <div className="card-main-container bg-yellow-200 px-4 py-4">
      <div className="section-heading flex justify-between items-center">
        <h1 className="font-bold py-3 text-xl">Blockbuster Deals</h1>
        <Link href={"/product"} className="underline text-blue-800 font-bold">
          View All
        </Link>
      </div>
      <div className="card-inner grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.slice(0,5).map((product) => (
          <Link href={`/product/${slugify(product.product_name)}`} key={product._id}>
          <div className="card-items rounded-md bg-white p-4 shadow-md">
            <div className="card-details">
              <div className="product-img text-center w-full h-full md:h-56">
                <img
                  src={product.product_images[0].image_url}
                  alt={product.product_name}
                  className="object-cover object-center rounded-md"
                />
              </div>
              <div className="card-bottom-details mt-2">
                <div className="product-offer flex justify-between items-center">
                  <div className="offer-percentage text-white bg-red-500 px-2 rounded py-1 text-sm font-semibold">
                    {product.pricing.discount_percentage}% off
                  </div>
                  <div className="offer-tag text-xs text-red-600">
                    {product.product_tags[0]}
                  </div>
                </div>
                <div className="product-price mt-1 flex justify-between items-center">
                  <div className="real-price font-bold text-lg">
                    ₹{product.pricing.real_price}
                  </div>
                  <div className="offer-price text-gray-500 text-sm line-through">
                    M.R.P ₹{product.pricing.offer_price}
                  </div>
                </div>
                <div className="product-title text-sm mt-2">
                  {product.product_name.slice(0, 50)}
                </div>
              </div>
            </div>
          </div>
        </Link>
        ))}
      </div>
    </div>
      </div>
    </div>
  );
};

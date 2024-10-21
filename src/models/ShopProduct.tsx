import mongoose from "mongoose";

interface ProductDataType {
  product_name: string;
  product_description: string;
  brand: string;
  product_category: string;
  product_rating: number;
  total_reviews: number;
  is_amazon_choice: boolean;
  bought_this_month: string;
  product_tags: string[];
  pricing: {
    real_price: number;
    offer_price: number;
    discount_percentage: number;
  };
  product_images: {
    image_url: string;
    alt_text: string;
  }[];
  product_features: string[];
  specifications: {
    processor: string;
    ram: string;
    storage: string;
    battery_capacity: string;
    operating_system: string;
    camera: {
      main_camera: string;
      front_camera: string;
    };
    weight: string;
    dimensions: string;
  };
  product_services: string[];
  seller_info: {
    seller_name: string;
    seller_rating: number;
    fulfilled_by_amazon: boolean;
  };
  reviews: {
    review_id: number;
    user_name: string;
    rating: number;
    review_title: string;
    review_description: string;
    review_date: string;
    verified_purchase: boolean;
    helpful_votes: number;
  }[];
}

// Define the schema based on the interface
const ProductSchema = new mongoose.Schema<ProductDataType>({
  product_name: { type: String, required: true },
  product_description: { type: String, required: true },
  brand: { type: String, required: true },
  product_category: { type: String, required: true },
  product_rating: { type: Number, required: true },
  total_reviews: { type: Number, required: true },
  is_amazon_choice: { type: Boolean, required: true },
  bought_this_month: { type: String, required: true },
  product_tags: { type: [String], required: true },
  pricing: {
    real_price: { type: Number, required: true },
    offer_price: { type: Number, required: true },
    discount_percentage: { type: Number, required: true },
  },
  product_images: [
    {
      image_url: { type: String, required: true },
      alt_text: { type: String, required: false },
    },
  ],
  product_features: { type: [String], required: true },
  specifications: {
    processor: { type: String, required: true },
    ram: { type: String, required: true },
    storage: { type: String, required: true },
    battery_capacity: { type: String, required: true },
    operating_system: { type: String, required: true },
    camera: {
      main_camera: { type: String, required: true },
      front_camera: { type: String, required: true },
    },
    weight: { type: String, required: true },
    dimensions: { type: String, required: true },
  },
  product_services: { type: [String], required: true },
  seller_info: {
    seller_name: { type: String, required: true },
    seller_rating: { type: Number, required: true },
    fulfilled_by_amazon: { type: Boolean, required: true },
  },
  reviews: [
    {
      review_id: { type: Number, required: true },
      user_name: { type: String, required: true },
      rating: { type: Number, required: true },
      review_title: { type: String, required: true },
      review_description: { type: String, required: true },
      review_date: { type: String, required: true },
      verified_purchase: { type: Boolean, required: true },
      helpful_votes: { type: Number, required: true },
    },
  ],
});

export const ProductModel =
  mongoose.models.Product || mongoose.model<ProductDataType>("Product", ProductSchema);

import { ProductModel } from "@/models/ShopProduct";
import { slugify } from "@/app/utils/slugify";
import dbConnect from "@/db/database";
import ImageSlider from "@/components/ImageSlider";
import NextBreadcrumb from "@/components/NextBreadcrumb";
import ClientCart from "@/components/ClientCart";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "this is cart page",
    description: "this is my description for cart page"
}

// Define the types for the Product data
interface ProductDataType {
  _id: string;
  id: number;
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
  product_images: { image_url: string; alt_text: string }[];
  product_features: string[];
  specifications: {
    processor: string;
    ram: string;
    storage: string;
    battery_capacity: string;
    operating_system: string;
    camera: string | { main_camera: string; front_camera: string };
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

interface ProductDetailsProps {
    params: {
        slug: string;
    };
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
    await dbConnect(); 
  const slug = params.slug;
  const products = await ProductModel.find().lean() as ProductDataType[];
  const matchedProduct = products.find(
    (product: ProductDataType) => slugify(product.product_name) === slug
  );

  if (!matchedProduct) {
    return <p>Product not found</p>;
  }


  return (
    <>
    <NextBreadcrumb/>
      <div className="products-detail-container pt-4 md:pt-6 flex flex-wrap justify-between items-start">
        {/* Product Images */}
        <div className="product-detail-left w-full md:w-1/2 pr-3">
          <ImageSlider images={matchedProduct.product_images} />
          <div className="flex mt-4 space-x-2">
          <ClientCart
               productId={matchedProduct._id.toString()} 
              productName={matchedProduct.product_name}
              productPrice={matchedProduct.pricing.real_price}
              productImage={matchedProduct.product_images[0].image_url}
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded font-semibold w-1/2">
              Buy Now
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-detail-right w-full md:w-1/2 mt-4 pl-6 h-[80vh] overflow-y-auto">
          {/* Product Name */}
          <h1 className="text-2xl font-bold mb-2">{matchedProduct.product_name}</h1>

          {/* Brand and Category */}
          <p className="text-sm text-gray-600">Brand: <span className="font-semibold">{matchedProduct.brand}</span></p>
          <p className="text-sm text-gray-600 mb-4">Category: <span className="font-semibold">{matchedProduct.product_category}</span></p>

          {/* Pricing Section */}
          <div className="products-pricing mb-4">
            <span className="text-lg font-semibold">₹{matchedProduct.pricing.real_price}</span>
            <span className="text-sm line-through ml-2">M.R.P: ₹{matchedProduct.pricing.offer_price}</span>
            <span className="text-sm text-red-600 ml-2">{matchedProduct.pricing.discount_percentage}% off</span>
          </div>

          {/* Product Description */}
          <div className="products-description mb-4">
            <p>{matchedProduct.product_description}</p>
          </div>

          {/* Product Tags */}
          <div className="products-tags mb-4">
            {matchedProduct.product_tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs mr-2">{tag}</span>
            ))}
          </div>

          {/* Product Features */}
          <div className="products-features mb-4">
            <h2 className="text-lg font-semibold">Key Features</h2>
            <ul className="list-disc pl-4">
              {matchedProduct.product_features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="products-specifications mb-4">
            <h2 className="text-lg font-semibold">Specifications</h2>
            <ul className="list-disc pl-4">
              {Object.entries(matchedProduct.specifications).map(([key, value], index) => (
                <li key={index} className="capitalize">
                  {/* Handle camera object separately */}
                  {key === "camera" ? (
                    typeof value === "object" ? (
                      <>
                        Main Camera: {value.main_camera} <br />
                        Front Camera: {value.front_camera}
                      </>
                    ) : (
                      <>{value}</> // If it's a string, just render the string
                    )
                  ) : (
                    <>{key.replace('_', ' ')}: {value}</>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Seller Info */}
          <div className="seller-info mb-4">
            <h2 className="text-lg font-semibold">Seller Information</h2>
            <p><strong>{matchedProduct.seller_info.seller_name}</strong> (Rating: {matchedProduct.seller_info.seller_rating})</p>
            {matchedProduct.seller_info.fulfilled_by_amazon && (
              <p className="text-sm text-green-600">Fulfilled by Amazon</p>
            )}
          </div>

          {/* Product Services */}
          <div className="product-services mb-4">
            <h2 className="text-lg font-semibold">Services</h2>
            <ul className="list-disc pl-4">
              {matchedProduct.product_services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Product Rating and Reviews */}
          <div className="products-rating mt-4">
            <h2 className="text-lg font-semibold">Customer Reviews</h2>
            <div className="flex justify-start items-center mb-4">
              <div className="rating flex items-center bg-green-600 text-white rounded-full px-2 py-1">
                {matchedProduct.product_rating}
                <img 
                  src="https://cdn-icons-png.flaticon.com/128/149/149220.png" 
                  className="ml-1" 
                  alt="Star" 
                  width={15} 
                  height={15} 
                />
              </div>
              <div className="ml-3">({matchedProduct.total_reviews} ratings)</div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="reviews-section">
            {matchedProduct.reviews.map((review) => (
              <div key={review.review_id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-md font-semibold">{review.review_title}</h3>
                <p className="text-sm text-gray-600 mb-1">By {review.user_name} on {new Date(review.review_date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-800">{review.review_description}</p>
                {review.verified_purchase && <p className="text-sm text-green-600">Verified Purchase</p>}
                <p className="text-sm text-gray-600">{review.helpful_votes} people found this helpful</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

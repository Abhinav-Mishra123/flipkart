import dbConnect from "@/db/database";
import { NextRequest, NextResponse } from "next/server";
import { ProductModel } from "@/models/ShopProduct";

// GET request handler to fetch product data
export async function GET(req: NextRequest) {
  await dbConnect(); // Ensure the database is connected

  try {
    const products = await ProductModel.find(); // Fetch all products from the database
    return NextResponse.json(products); // Send products as a JSON response
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

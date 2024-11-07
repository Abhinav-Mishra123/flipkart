import dbConnect from "@/db/database";
import { NextRequest, NextResponse } from "next/server";
import { ProductModel } from "@/models/ShopProduct";

export async function GET(_req: NextRequest) {
  await dbConnect();

  try {
    const products = await ProductModel.find();
    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Error fetching products:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

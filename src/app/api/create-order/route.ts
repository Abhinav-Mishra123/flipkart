import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

interface razorpayType {
    key_id:string,
    key_secret:string
} 

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = "INR" } = await req.json();
    const options = {
      amount: amount / 100,
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    // Return the created order object as a JSON response
    return NextResponse.json(order); 
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({
      status: 500,
      message: "Error creating order",
    });
  }
}

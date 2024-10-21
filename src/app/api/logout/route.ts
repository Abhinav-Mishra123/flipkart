import { NextResponse } from "next/server";

export async function GET() {
  // Create a new NextResponse object with a JSON message
  const response = NextResponse.json({ message: "Logout successfully" });

  // Set the 'token' cookie to expire immediately by setting maxAge to 0
  response.cookies.set("token", "", { path: "/", maxAge: 0 });

  // Return the response object
  return response;
}

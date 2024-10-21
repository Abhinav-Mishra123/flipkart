import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


const JWT_SECRET:string = process.env.JWT_SECRET as string; 

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value; 

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload; 

    const { userId, email, name } = decoded; 

    return NextResponse.json({
      message: "Authenticated",
      user: { email, name },
    });
  } catch (error:any) {
    console.error("Token verification failed:", error.message); // Log error for debugging
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

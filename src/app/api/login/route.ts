import dbConnect from "@/db/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect(); 
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    
    // Include name in the token payload
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        name: user.name, // Add name here
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    
    const response = NextResponse.json({
      message: "Login successful",
      token,
      user,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60,
      secure: process.env.NODE_ENV === 'production'
    });
    
    return response;

  } catch (error: any) {
    console.error("Login error:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

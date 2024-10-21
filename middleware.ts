// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // If token is missing, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify token
    jwt.verify(token, JWT_SECRET);
    // Allow the request to continue if the token is valid
    return NextResponse.next();
  } catch (error) {
    // If token is invalid, redirect to login page
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Define the routes that should be protected
export const config = {
  matcher: ['/protected-page', '/dashboard/:path*'], // Add routes you want to protect
};

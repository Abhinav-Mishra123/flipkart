import dbConnect from "@/db/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
var bcrypt = require('bcryptjs');


export async function POST(req: NextRequest, res: NextResponse){
    await dbConnect();
    const reqBody = await req.json();
    const {name, email, password} = reqBody;
    try {
        const UserFound = await User.findOne({ email })
        if(UserFound){
            return NextResponse.json({ error: "User already exists"}, {status: 400})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        const savedUser = await user.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, { status: 500})        
    }


}
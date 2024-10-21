import mongoose from "mongoose";

export interface UserDocument {
    _id: String,
    name: String,
    email: String,
    password: String,
    isVerified: Boolean,
    isAdmin: Boolean,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
    verifyToken:String,
    verifyTokenExpiry: String,
    createdAt: Date,
    updatedAt: Date
}

const UserSchema = new mongoose.Schema<UserDocument>({
    name: { 
        type: String, 
        required:[true, "Name is required"],
    },
    email:{ 
        type: String, 
        required:[true, "Email is required"],
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Email is invalid",
          ],
    },
    password: { 
        type: String, 
        required:true 
    },
    isVerified: {
        type: Boolean,
        default: false,
     },
     isAdmin: {
         type: Boolean,
         default: false,
     },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
},  
    {
        timestamps: true,
    }
);

const User = mongoose.models?.User || mongoose.model("User", UserSchema);
export default User;
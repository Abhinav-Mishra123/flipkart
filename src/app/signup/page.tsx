"use client";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface FormDataType {
    name: string,
    email:string,
    password: string
}
interface ErrorMessage {
    name?: string;
    email?: string;
    password?: string;
}

<Toaster
  position="top-center"
  reverseOrder={true}
/>

export default function page(){
    const router = useRouter()
    const [showIcon, setShowIcon] = useState(true)
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});
    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        email:"",
        password:""
    });

    const handleEyeToggle = () =>{
        setShowIcon(!showIcon)
    }

  const handleInput = (e:any) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
        console.log(`${name}: ${value}`)

  }
  const validateForm = (data: FormDataType): ErrorMessage =>{
    const name_regex = /^[a-zA-Z]+(?:[\s][a-zA-Z]+)*$/;
    const errors: ErrorMessage = {};

    if (!data.name || data.name.length < 2) {
        errors.name = "Name is too short";
    } else if (!name_regex.test(data.name)) {
        errors.name = "Name can only contain letters and spaces";
    }

    if (!data.email) {
        errors.email = "Email is required";
    }

    if (!data.password || data.password.length < 5) {
        errors.password = "Password is too short";
    }

    return errors;
  }

  const signUp = async () =>{
      try {
          const errors =  validateForm(formData)
          if(Object.keys(errors).length > 0){
                setErrorMessage(errors);
                toast.error("Kindly fill all details",
                    {
                        duration:2000,
                    }
                )
           }
           else{
            const response = await axios.post("/api/signup", formData);
                console.log("response submit from front end", response)
                setErrorMessage({})
                setTimeout(()=>{
                    router.push("/login")
                },1500)
                console.log("form submitted successfully")
                toast.success('You registered successfully!',
                    {
                        icon: '✔',
                        duration: 2000,
                        style: {
                          borderRadius: '10px',
                          background: '#333',
                          color: '#fff',
                        },
                    }
                )
           }
        }
    catch(error:any){
        console.log("Signup failed", error.message);
        toast.success('Email already registred , kindly login!',
            {
                icon: '😊',
                duration: 2000,
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
            }
        )
    }


  }
    return(
        <>
        <Toaster position="top-center" reverseOrder={true}/>
       <section className="signup-section">
        <div className="signup-box">
            <div className="form-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <form method="POST" className="signupform" onSubmit={(e)=> e.preventDefault()}>
                    <div className="form-group">
                        <label>Full Name*</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInput} className="form-control" placeholder="Enter Full Name"></input>
                        {errorMessage.name && <p className="text-red-800 text-left text-xs w-full">{errorMessage.name}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email*</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInput} className="form-control" placeholder="Enter Email"></input>
                        {errorMessage.email && <p className="text-red-800 text-left text-xs w-full">{errorMessage.email}</p>}
                    </div>
                    <div className="form-group relative">
                        <label>Password*</label>
                        <input type={showIcon ? "password" : "text" } value={formData.password} onChange={handleInput} name="password" className="form-control" placeholder="Enter Password"></input>
                        {errorMessage.password && <p className="text-red-800 text-left text-xs w-full">{errorMessage.password}</p>}
                        <div className="toggleimg cursor-pointer" title={showIcon ? "show Password" : "Hide password"} onClick={handleEyeToggle}>
                            {showIcon}
                             { showIcon ? <GoEyeClosed/> : <RxEyeOpen/> }
                        </div>
                    </div>
                    <div className="signup-btn text-center">
                        <button className="btn bg-red-100 px-6 py-2 rounded-md font-semibold text-sm" onClick={signUp}>Sign Up</button>
                    </div>
                    <div className="text-center mt-3">
                        <span>Already have an account <Link href={"/login"} className="text-blue-600 underline cursor-pointer">Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
       </section>
        </>
    )
}

function getcurrentValue() {
    throw new Error("Function not implemented.");
}

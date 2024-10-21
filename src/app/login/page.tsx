"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";

interface ErrorMessage {
  name?: string;
  email?: string;
  password?: string;
}

interface FormDataType {
  email: string;
  password: string;
}


const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({});

  useEffect(() => {
    // Check if user is logged in when page loads
    const checkUserSession = async () => {
      try {
        const response = await axios.get('/api/me');
        if (response.data.user) {
          setUser(response.data.user);  // Set user info
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUser(null);  // No user is logged in
      }
    };

    checkUserSession();
  }, []);

  const handleEyeToggle = () => {
    setShowIcon(!showIcon);
  };

  const validateForm = (data: FormDataType): ErrorMessage =>{
    const errors: ErrorMessage = {};
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is not valid";
    }
    if (!data.password || data.password.length < 5) {
      errors.password = "Password must be at least 5 characters";
    }
    return errors;
  }

  const handleLogin = async () => {
    const formData: FormDataType = { email, password };

    // Validate form data
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    } else {
      setErrorMessage({});
    }
    try {
      const response = await axios.post("/api/login", { email, password });

      if (response.data.user) {
        toast.success("You are logged in successfully!", {
          duration: 2000,
        });
        setUser(response.data.user); 
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error:any) {
      console.log("Login error:", error.response?.data?.error || error.message);
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const handleLogout = async() =>{
    try{
      const logoutres = await axios.get("/api/logout");
      toast.success("Logged out successfully!", { duration: 2000 });
      router.push("/");
    }catch(error){
      console.error("Logout error:", error);
      toast.error("Error logging out. Please try again.");
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <section className="login-section">
        <div className="login-box">
          <div className="form-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {user ? (
              <div className='text-center justify-center items-center'>
                <h1>Welcome, {user.name}</h1>
                <p>Email: {user.email}</p>
                <div className='logout-btn text-center my-2'>
                  <button onClick={handleLogout} className="btn bg-red-500 px-6 py-2 rounded-md text-white text-center font-semibold">
                    Logout
                  </button>
                </div>
              </div>
              
            ) : (
              <form method="POST" className="signupform"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <div className="form-group">
                  <label>Email*</label>
                  <input className='form-control'
                    type="email"
                    value={email} autoComplete='on'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errorMessage.email && <p className="text-red-800 text-left text-xs w-full">{errorMessage.email}</p>}
                </div>
                <div className="form-group relative">
                  <label>Password*</label>
                  <input
                    type={showIcon ? "password" : "text"}
                    value={password} className='form-control'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errorMessage.email && <p className="text-red-800 text-left text-xs w-full">{errorMessage.password}</p>}
                <div className="toggleimg cursor-pointer" title={showIcon ? "show Password" : "Hide password"} onClick={handleEyeToggle}>
                            {showIcon}
                             { showIcon ? <GoEyeClosed/> : <RxEyeOpen/> }
                        </div>
                </div>
                <div className="signup-btn text-center">
                  <button className="btn bg-red-100 px-6 py-2 rounded-md font-semibold text-sm" type="submit">Login</button>
                </div>
                <div className="text-center mt-3">
                        <span>Already have an account <Link href={"/signup"} className="text-blue-600 underline cursor-pointer">Signup</Link></span>
                    </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;

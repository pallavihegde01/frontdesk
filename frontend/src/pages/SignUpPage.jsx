import React, { useState } from 'react';
import { Cable } from "lucide-react";
import { Link, Navigate, useNavigate } from 'react-router';
import { signup } from '../lib/api'; 

const SignUpPage = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      await signup(signupData); // call API
      console.log("Signup successful ✅");
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="night">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* LOGO */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <Cable className='size-9 text-secondary'/>
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary tracking-wider">
              Front desk
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error}</span>
            </div>
          )}

          <div className='w-full'>
            <form onSubmit={handleSignup}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>Create an Account</h2>
                  <p className='text-sm opacity-70'>
                    Join Front desk and start your journey!
                  </p>
                </div>

                <div className='space-y-3'>
                  {/* NAME */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Username</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder='John Doe'
                      className='input input-bordered w-full'
                      value={signupData.username}
                      onChange={(e)=>setSignupData({...signupData, username: e.target.value})}
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder='John@gmail.com'
                      className='input input-bordered w-full'
                      value={signupData.email}
                      onChange={(e)=>setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input 
                      type="password" 
                      placeholder='********'
                      className='input input-bordered w-full'
                      value={signupData.password}
                      onChange={(e)=>setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                    <p className='text-xs opacity-70 mt-1'>
                      Password must be at least 6 characters long
                    </p>
                  </div>

                  {/* TERMS AND CONDITIONS */}
                  <div className='form-control'>
                    <label className='label cursor-pointer justify-start gap-2'>
                      <input type="checkbox" className='checkbox checkbox-sm' required/>
                      <span className='text-xs leading-tight'>
                        I agree to the{" "}
                        <span className='text-secondary hover:underline'>terms of service</span> and{" "}
                        <span className='text-secondary hover:underline'>privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button className='btn btn-secondary w-full' type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* LINK TO LOGIN */}
                <div className='text-center mt-4'>
                  <p className='text-sm'>
                    Already have an account?{" "}
                    <Link to="/login" className='text-secondary hover:underline'>
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-secondary/10 items-center justify-center'>
          <div className='max-w-md p-8'>
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src="/signup1.png" alt="connecting to others" className='w-full h-full' />
            </div>
            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>Connect with doctors worldwide</h2>
              <p className='opacity-70'>
                Share your thoughts with experts
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;

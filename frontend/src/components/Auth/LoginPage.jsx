import React, { useState } from "react";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  LogIn 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { GoLaw } from "react-icons/go";

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleLogin = (e) => {
        e.preventDefault();
        // Add your authentication logic here
        console.log("Logging in with:", credentials);
        navigate("/candidate"); // Redirect to dashboard after login
    };

    return (
        <div className="min-h-screen bg-[#FDFDFE] flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">
            
            {/* Branding Header */}
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-blue-600 text-white shadow-xl shadow-blue-200 mb-8">
                    <GoLaw size={32} />
                </div>
                <h2 className="text-4xl font-black text-zinc-900 tracking-tight">
                    Welcome Back
                </h2>
                <p className="mt-3 text-sm font-medium text-zinc-500">
                    New to the platform?{" "}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
                        Register as a Candidate
                    </Link>
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[440px] relative z-10">
                <div className="bg-white/80 backdrop-blur-xl py-12 px-10 shadow-md rounded-[2.5rem] border-2 border-zinc-200">
                    
                    <form className="space-y-6" onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-[0.1em] ml-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                <input
                                    required
                                    type="email"
                                    placeholder="rajesh@voterledger.in"
                                    className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border-2 border-zinc-200 rounded-2xl text-sm font-bold text-zinc-700 outline-none focus:bg-white focus:border-blue-600 focus:ring-[4px] focus:ring-blue-600/5 transition-all"
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[11px] font-black uppercase text-zinc-400 tracking-[0.1em]">
                                    Password
                                </label>
                                <Link to="/forgot-password" size="sm" className="text-[10px] font-bold text-blue-600 hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-12 py-3.5 bg-zinc-50 border-2 border-zinc-200 rounded-2xl text-sm font-bold text-zinc-700 outline-none focus:bg-white focus:border-blue-600 focus:ring-[4px] focus:ring-blue-600/5 transition-all"
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me Toggle (Optional) */}
                        <div className="flex items-center px-1">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-xs font-bold text-zinc-500 cursor-pointer">
                                Keep me signed in
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="group w-full flex items-center justify-center gap-3 bg-zinc-900 hover:bg-blue-600 text-white px-6 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-blue-200 active:scale-[0.98] mt-8"
                        >
                            Sign In <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Security Badge */}
                    <div className=" pt-8 border-t border-zinc-100 flex items-center justify-center gap-3 grayscale opacity-50">
                        <ShieldCheck size={20} className="text-zinc-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            Secured by VoterLedger Node
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
import React, { useState } from "react";
import {
    User, Mail, Lock, ArrowRight, Eye, EyeOff,
    AlertCircle, MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import { GoLaw } from "react-icons/go";
import { useAuth } from "../../hooks/auth/useAuth";

const SignupPage = () => {
    const { signupMutation } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const handleSunmit = async (e) => {
        e.preventDefault()
        await signupMutation.mutateAsync(formData);

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        });
    }

    // Calculate progress based on the 4 main fields
    const strength = Object.values(formData).filter(v => v.length > 0).length * 25;

    return (
        <div className="min-h-screen bg-[#FDFDFE] flex flex-col justify-center py-12 px-6 lg:px-8 relative overflow-hidden">

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-blue-600 text-white shadow-xl shadow-blue-200 mb-8 animate-bounce-slow">
                    <GoLaw size={32} />
                </div>
                <h2 className="text-4xl font-black text-zinc-900 tracking-tight">
                    Candidate Registry
                </h2>
                <p className="mt-3 text-sm font-medium text-zinc-500">
                    Already registered?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
                        Sign in to VoterLedger
                    </Link>
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
                <div className="bg-white/80 backdrop-blur-xl py-10 px-10 shadow-md rounded-[2.5rem] border-2 border-zinc-200">

                    {/* Completion Progress Bar */}
                    <div className="mb-8 h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-500 ease-out"
                            style={{ width: `${Math.max(strength, 5)}%` }}
                        />
                    </div>

                    <form className="space-y-6" onSubmit={handleSunmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <EnhancedInput
                                label="First Name"
                                placeholder="Rajesh"
                                icon={<User size={16} />}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                            <EnhancedInput
                                label="Last Name"
                                placeholder="Kumar"
                                icon={<User size={16} />}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>

                        <EnhancedInput
                            label="Email Address"
                            type="email"
                            placeholder="rajesh@voterledger.in"
                            icon={<Mail size={16} />}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <div className="relative">
                            <EnhancedInput
                                label="Create Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                icon={<Lock size={16} />}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-[38px] text-zinc-400 hover:text-zinc-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-zinc-400 tracking-[0.1em] ml-1">Assigned Constituency</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                                <select className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border-2 border-zinc-200 rounded-2xl text-sm font-bold text-zinc-700 outline-none focus:border-blue-600 focus:bg-white transition-all appearance-none cursor-pointer">
                                    <option>Mumbai North</option>
                                    <option>Pune Central</option>
                                    <option>Nagpur East</option>
                                </select>
                            </div>
                        </div>

                        <button
                        disabled={signupMutation.isPending}
                            type="submit"
                            className="group w-full flex items-center justify-center gap-3 bg-zinc-900 hover:bg-blue-600 text-white px-6 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-blue-200 active:scale-[0.98]"
                        >
                            {signupMutation.isPending ? "Registering... "
                                : "Initialize Registry"}<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="mt-8 flex items-start gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                        <AlertCircle size={18} className="text-blue-600 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-blue-800 leading-relaxed font-semibold">
                            Candidacy registrations are cryptographically logged. Ensure all details match your official Election Commission ID.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EnhancedInput = ({ label, type = "text", ...props }) => (
    <div className="space-y-2">
        <label className="text-[11px] font-black uppercase text-zinc-400 tracking-[0.1em] ml-1">{label}</label>
        <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-blue-600">
                {props.icon}
            </div>
            <input
                {...props}
                type={type}
                className="w-full pl-11 pr-4 py-3.5 bg-zinc-50 border-2 border-zinc-200 rounded-2xl text-sm font-bold text-zinc-700 placeholder:text-zinc-300 outline-none focus:bg-white focus:border-blue-600 focus:ring-[4px] focus:ring-blue-600/5 transition-all"
            />
        </div>
    </div>
);

export default SignupPage;
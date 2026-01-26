import React from 'react'
import { GoLaw } from "react-icons/go";
import { Search } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/auth/useAuth';

const Navbar = () => {
    const navigate = useNavigate();
    const { authUser } = useAuth()

    const navLinkClass = ({ isActive }) =>
        `text-sm sm:text-base font-medium transition-colors
   ${isActive ? "text-blue-600 scale-110" : "text-gray-600"}
   hover:text-blue-600`;



    return (
        <header className=" w-full border-b-2 border-b-zinc-200 bg-white px-10">
            <div className="mx-auto flex h-16 items-center justify-between px-10">

                {/* Left Section */}
                <NavLink to="/" className="flex items-center gap-16">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-bold">
                            <GoLaw size={20} />
                        </div>
                        <span className="text-lg font-semibold text-blue-600">
                            VoterLedger
                        </span>
                    </div>
                </NavLink>

                {/* Right Section */}
                <div className="flex items-center gap-10 ">
                    {/* Nav Links */}
                    <div className="hidden md:flex items-center  gap-10 text-sm font-medium">
                        <NavLink to="/elections" className={navLinkClass}>Elections</NavLink>
                        <NavLink to="/constituency" className={navLinkClass}>About</NavLink>
                    </div>

                    {/* Auth */}
                    {/* <button className="text-sm font-medium text-gray-700 hover:text-blue-600">
                        Log In
                    </button> */}
                    {
                        authUser ? (
                            <button
                                onClick={() => navigate('/signup')}
                                className="flex-1 rounded-lg bg-blue-600 px-8 py-1 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Sign Up
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate('/candidate')}
                                className="flex-1 rounded-lg bg-blue-600 px-8 py-1 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                Go To Dashboard
                            </button>
                        )
                    }

                </div>
            </div>
        </header>
    );
}

export default Navbar

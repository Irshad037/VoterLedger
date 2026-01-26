import React from 'react'
import { GoLaw } from 'react-icons/go'

const Footer = () => {
    return (
        <footer className="bg-zinc-50 border-t border-zinc-200">
            <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

                    {/* BRAND */}
                    <div>
                        <div className="mb-4 flex items-center gap-2 text-blue-700">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-bold">
                                <GoLaw size={20} />
                            </div>
                            <span className="text-xl font-semibold text-zinc-900">
                                VoterLedger
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed text-zinc-600">
                            Transparent election tracking and governance accountability for
                            Indian citizens.
                        </p>
                    </div>

                    {/* PLATFORM */}
                    <div>
                        <h4 className="mb-4 text-xl font-semibold text-zinc-900">
                            Platform
                        </h4>
                        <ul className="space-y-3 text-sm text-zinc-600">
                            <li><a href="#" className="hover:text-zinc-900">Elections</a></li>
                            <li><a href="#" className="hover:text-zinc-900">Candidate Comparison</a></li>
                            <li><a href="#" className="hover:text-zinc-900">Manifestos</a></li>
                            <li><a href="#" className="hover:text-zinc-900">Governance Dashboard</a></li>
                        </ul>
                    </div>

                    {/* COMMUNITY */}
                    <div>
                        <h4 className="mb-4 text-xl font-semibold text-zinc-900">
                            Community
                        </h4>
                        <ul className="space-y-3 text-sm text-zinc-600">
                            <li><a href="#" className="hover:text-zinc-900">Citizen Verification</a></li>
                            <li><a href="#" className="hover:text-zinc-900">About Us</a></li>
                            <li><a href="#" className="hover:text-zinc-900">Open Data</a></li>
                        </ul>
                    </div>

                    {/* LEGAL */}
                    <div>
                        <h4 className="mb-4 text-xl font-semibold text-zinc-900">
                            Legal
                        </h4>
                        <ul className="space-y-3 text-sm text-zinc-600">
                            <li><a href="#" className="hover:text-zinc-900">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-zinc-900">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-zinc-900">Data Sources</a></li>
                            <li><a href="#" className="hover:text-zinc-900">Transparency Report</a></li>
                        </ul>
                    </div>

                </div>

                {/* DIVIDER */}
                <div className="mt-8 border-t border-zinc-200 pt-6 text-center">
                    <p className="text-sm text-zinc-500">
                        © 2026 ElectionWatch. A non-partisan civic technology initiative.
                    </p>
                    <p className="mt-2 text-xs text-zinc-400">
                        Data updated as of January 23, 2026.
                    </p>
                </div>
            </div>
        </footer>

    )
}

export default Footer
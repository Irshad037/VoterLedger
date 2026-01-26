import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  CheckCircle2, 
  Database, 
  Globe,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-zinc-50/50">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 rounded-full border border-blue-100">
              The Future of Governance
            </span>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-8">
              Transparency in every <span className="text-blue-600 italic">Voter Ledger</span>
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed mb-10 font-medium">
              VoterLedger is a next-generation platform designed to digitize candidacy registration, 
              manifesto management, and election oversight with cryptographic integrity.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-200">
                Register as Candidate <ArrowRight size={18} />
              </Link>
              <button className="px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-zinc-600 border-2 border-zinc-200 hover:bg-zinc-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Core Values */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-black text-zinc-900 mb-4">Our Core Pillars</h2>
          <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <ValueCard 
            icon={<ShieldCheck  size={32} />}
            title="Integrity"
            desc="Every application and manifesto promise is cryptographically timestamped and audited by election administrators."
          />
          <ValueCard 
            icon={<Lock  size={32} />}
            title="Accountability"
            desc="Approved promises are locked into the ledger, ensuring candidates are held to their word throughout the election cycle."
          />
          <ValueCard 
            icon={<Users  size={32} />}
            title="Inclusivity"
            desc="A streamlined digital flow that makes candidacy registration accessible to every citizen, regardless of their location."
          />
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-24 bg-zinc-900 text-white rounded-[4rem] mx-6 mb-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 leading-tight">Empowering the <br/>Election Lifecycle</h2>
            <div className="space-y-6">
              <FeatureItem title="Smart Manifesto Builder" desc="Candidates create structured policy goals with budget and timeline tracking." />
              <FeatureItem title="Admin Audit Dashboard" desc="Election officers can review, verify, and approve applications in real-time." />
              <FeatureItem title="Immutable Record Keeping" desc="A tamper-proof system for historical election data and candidate performance." />
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-blue-600/20 rounded-[3rem] border border-blue-500/30 backdrop-blur-3xl flex items-center justify-center p-12">
               <Database size={200} className="text-blue-500 opacity-40 absolute" />
               <div className="bg-zinc-800 p-8 rounded-3xl border border-zinc-700 shadow-2xl relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-black uppercase tracking-widest text-zinc-400">System Live</span>
                  </div>
                  <p className="text-lg font-bold leading-relaxed">
                    "Our goal is to eliminate administrative bottlenecks and provide a single source of truth for voters and officials alike."
                  </p>
                  <div className="mt-6 pt-6 border-t border-zinc-700 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-black">VL</div>
                    <div>
                        <p className="text-sm font-bold">VoterLedger Protocol</p>
                        <p className="text-[10px] uppercase font-bold text-zinc-500">Official Release v1.0</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-black text-zinc-900 mb-8">Ready to participate?</h2>
        <div className="flex justify-center gap-4">
            <Link to="/signup" className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                Get Started
            </Link>
        </div>
      </section>
    </div>
  );
};

/* Sub-components */

const ValueCard = ({ icon, title, desc }) => (
  <div className="group p-10 rounded-[2.5rem] bg-white border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-black text-zinc-900 mb-4 uppercase tracking-tight">{title}</h3>
    <p className="text-zinc-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const FeatureItem = ({ title, desc }) => (
  <div className="flex gap-5">
    <div className="mt-1">
      <CheckCircle2 size={24} className="text-blue-500" />
    </div>
    <div>
      <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
      <p className="text-zinc-400 text-sm font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default AboutPage;
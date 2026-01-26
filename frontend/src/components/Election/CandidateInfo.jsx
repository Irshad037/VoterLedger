import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowLeft, DollarSign, User, TriangleAlert, CircleCheckBig, ShieldAlert, TrendingUp, FileText } from "lucide-react";
import img from '../../assets/election/image3.png'

const CandidateInfo = () => {
  const { electionId, candidateId } = useParams();
  const navigate = useNavigate();

  // TEMP mock data (later replace with API)
  const candidate = {
    name: "Priya Sharma",
    party: "Democratic Alliance",
    age: 45,
    education: "MBA, IIM Ahmedabad",
    assets: "₹0.50 Cr",
    img: "/candidate.jpg",
    isWinner: true,
    assetBreakdown: {
      movable: "₹0.15 Cr",
      immovable: "₹0.33 Cr",
      other: "₹0.03 Cr",
    },
  };

  const [select, setSelect] = useState("Profile");
  const isClean = false;

  return (

    <div className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2  text-zinc-600 hover:text-zinc-900 text-sm font-bold cursor-pointer"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* HEADER CARD */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-zinc-200 flex gap-6">
          <div className="h-30 w-30 rounded-2xl bg-blue-100 flex items-center justify-center">
            <img
              src={img}
              alt=""
              className="h-[110px] w-[110px] rounded-xl object-cover"
            />
          </div>


          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{candidate.name}</h1>
              {candidate.isWinner && (
                <span className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white">
                  <CheckCircle size={14} />
                  Elected Representative
                </span>
              )}
            </div>

            <p className="mt-2 text-zinc-600 text-lg font-semibold">{candidate.party}</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <InfoBox label="Age" value={`${candidate.age}`} />
              <InfoBox label="Education" value={candidate.education} />
              <InfoBox label="Assets" value={candidate.assets} />
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-6 flex gap-4 bg-gray-100 py-3 px-2 rounded-md ">
          <button
            onClick={() => setSelect("Profile")}
            className={` flex-1 
              ${select === "Profile" ? "rounded-md shadow-md bg-white py-1 " : " text-zinc-500"}
             font-bold text-sm  flex items-center justify-center gap-1 cursor-pointer`
            }
          >
            <User size={15} />Profile
          </button>
          <button
            onClick={() => setSelect("Manifesto")}
            className={`flex-1  
              ${select === "Manifesto" ? "rounded-md shadow-md bg-white py-1 " : " text-zinc-500"} 
              font-bold
              text-sm flex items-center justify-center gap-1 cursor-pointer`}
          >
            <FileText size={15} />Manifesto
          </button>
        </div>

        {select === "Profile" ? (<>
          {/* ASSET DECLARATION */}
          <div className="mt-6 rounded-xl bg-white p-6 shadow-sm border-2 border-zinc-200">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-green-700">
              <DollarSign size={20} /> <span className="text-black">Asset Declaration</span>
            </h3>

            <div className="rounded-lg bg-green-50 p-4 flex justify-between">
              <span className="font-medium">Total Declared Assets</span>
              <span className="font-bold text-green-700 text-2xl">
                {candidate.assets}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <AssetBox label="Movable Assets" value={candidate.assetBreakdown.movable} />
              <AssetBox label="Immovable Assets" value={candidate.assetBreakdown.immovable} />
              <AssetBox label="Other Assets" value={candidate.assetBreakdown.other} />
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-zinc-900">
              <ShieldAlert className="h-5 w-5 text-orange-500" />
              Criminal Case Status
            </div>

            {/* Status Box */}
            <div
              className={`rounded-lg border p-10 text-center ${isClean
                ? "border-green-200 bg-green-50"
                : "border-red-200 bg-red-50"
                }`}
            >
              {isClean ? (
                <>
                  <CircleCheckBig className="mx-auto h-10 w-10 text-green-600" />
                  <p className="mt-4 text-3xl font-bold text-zinc-900">0</p>
                  <p className="mt-1 text-zinc-600">No Criminal Cases</p>

                  <span className="mt-4 inline-block rounded-md bg-green-600 px-4 py-1 text-sm font-semibold text-white">
                    Clean Record
                  </span>
                </>
              ) : (
                <>
                  <TriangleAlert className="mx-auto h-10 w-10 text-red-600" />
                  <p className="mt-4 text-3xl font-bold text-zinc-900">4</p>
                  <p className="mt-1 text-zinc-600">Criminal Cases Found</p>

                  <span className="mt-4 inline-block rounded-md bg-red-600 px-4 py-1 text-sm font-semibold text-white">
                    Legal Concerns
                  </span>
                </>
              )}
            </div>
          </div>
        </>) : (<>
          <div className="mt-6 space-y-6">
            {manifestoData.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border-2 border-zinc-200 bg-white p-6 shadow-sm"
              >
                {/* CATEGORY */}
                <h3 className="mb-4 flex items-center gap-2 font-semibold text-blue-600">
                  <TrendingUp size={24} /> <span className="text-black text-lg ">{item.category}</span>
                </h3>

                {/* PROMISE CARD */}
                <div className="rounded-lg border-2 border-zinc-200 hover:border-blue-500 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">
                        {item.title}
                      </h4>
                      <p className="text-sm text-zinc-600">
                        {item.description}
                      </p>
                    </div>

                    <span className="rounded-md bg-green-500 px-3 py-1 text-sm font-bold text-white">
                      {item.progress}%
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-medium text-zinc-600">
                    Progress
                  </p>

                  <div className="mt-2 h-2 w-full rounded-full bg-blue-100 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>)}

        <button
        onClick={()=>navigate(`/elections/${electionId}/candidate/${candidateId}/fund`)}
          className="w-full flex items-center justify-center gap-1 bg-blue-600 py-2 px-30 text-white rounded-md hover:shadow-xl hover:bg-blue-800 cursor-pointer "
        >
          <DollarSign size={18} />
          <span className="text-lg font-bold">View Fund Dashboard</span>
        </button>



      </div>
    </div>
  );
};

export default CandidateInfo;

const InfoBox = ({ label, value }) => (
  <div className="rounded-lg bg-blue-50 p-4">
    <p className="text-sm font-semibold text-zinc-500">{label}</p>
    <p className="mt-1 text-2xl font-bold text-blue-800">{value}</p>
  </div>
);

const AssetBox = ({ label, value }) => (
  <div className="rounded-lg border-2 border-zinc-200 p-4">
    <p className="text-sm font-semibold text-zinc-500">{label}</p>
    <p className="mt-1 font-bold text-xl">{value}</p>
  </div>
);

const manifestoData = [
  {
    category: "Infrastructure",
    title: "Build 50km of new roads",
    description: "Construction of high-quality roads connecting rural areas",
    progress: 65,
  },
  {
    category: "Healthcare",
    title: "Establish 10 community health centers",
    description: "Free healthcare facilities in underserved areas",
    progress: 40,
  },
  {
    category: "Education",
    title: "Renovate 100 government schools",
    description: "Complete infrastructure upgrade with digital classrooms",
    progress: 80,
  },
];


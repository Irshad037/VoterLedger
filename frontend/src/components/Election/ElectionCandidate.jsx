import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import CandidateCard from "./cards/CandidateCard";
import img1 from '../../assets/election/image1.png'
import img2 from '../../assets/election/image2.png'
import img3 from '../../assets/election/image3.png'
import { ArrowLeft } from "lucide-react";

const ElectionCandidate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-100 px-6 py-10 ">
            <div className="max-w-6xl mx-auto">

                {/* BACK BUTTON */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-lg text-zinc-600 hover:text-zinc-900 cursor-pointer"
                >
                   <ArrowLeft />Back to Election 
                </button>

                {/* HEADER */}
                <h1 className="text-3xl font-bold text-zinc-900">
                    Mumbai North
                </h1>
                <p className="text-zinc-600">Maharashtra</p>

                {/* CANDIDATE CARDS */}
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Candidate Card 1 */}
                    <CandidateCard
                        name="Rajesh Kumar"
                        party="Democratic Alliance"
                        winner
                        age={45}
                        assets="₹0.5 Cr"
                        cases={0}
                        education="MBA, IIM Ahmedabad"
                        img={img1}
                        showResult={true}
                        votePercent={52}
                        electionId={id}
                        candidateId={2}
                    />

                    <CandidateCard
                        name="Amit Patel"
                        party="Progressive Party"
                        age={38}
                        assets="₹0.3 Cr"
                        cases={1}
                        education="MA Political Science"
                        highlighted
                        img={img2}
                        showResult={true}
                        votePercent={28}
                    />

                    <CandidateCard
                        name="Priya Sharma"
                        party="National Front"
                        age={52}
                        assets="₹0.8 Cr"
                        cases={2}
                        education="BTech IIT Delhi"
                        img={img3}
                        showResult={true}
                        votePercent={10}
                    />
                </div>
            </div>

        </div>
    );
};

export default ElectionCandidate;

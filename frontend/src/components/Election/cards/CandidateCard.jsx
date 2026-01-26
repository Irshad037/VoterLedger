import { useNavigate } from "react-router-dom";
import { ArrowRightSquare, ChevronRightSquare, CircleCheckBig, TriangleAlert } from 'lucide-react';
import React from 'react'

const CandidateCard = ({ name, party, age, assets, cases, education, winner, img, candidateId, electionId,
  votePercent,
  showResult   // (boolean) 
}) => {
  const navigate = useNavigate();


  return (
    <div
      onClick={() => navigate(`/elections/${electionId}/candidate/${candidateId}`)}
      className={`rounded-xl p-6 bg-white shadow-sm border-5 ${winner ? "border-green-500 " : "border-zinc-200"
        }  hover:border-blue-600  hover:-translate-y-2 transition-all duration-300`}
    >
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center" >
          <img src={img} alt="" className='h-18 w-18 rounded-full object-cover ' />
        </div>
        <div>
          <h3 className="font-bold text-xl">{name}</h3>
          <p className="text-sm text-zinc-500 font-semibold">{party}</p>
          {winner && (
            <div className='w-full'>
              <div className="mt-1 rounded-sm bg-green-600 px-3 py-1 text-xs font-bold text-white inline-flex items-center gap-1" >
                <CircleCheckBig size={14} />
                <span >
                  Winner
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between items-center bg-blue-50 py-2 px-4 rounded">
          <span className='font-semibold text-zinc-600'>Age</span>
          <span className="font-medium text-blue-800 text-lg ">{age} years</span>
        </div>

        <div className="flex justify-between items-center bg-green-50 py-2 px-4 rounded">
          <span className='font-semibold text-zinc-600'>Assets</span>
          <span className="font-medium text-green-700 text-lg">{assets}</span>
        </div>

        <div className="flex justify-between items-center bg-orange-50 py-2 px-4 rounded">
          <span className='font-semibold text-zinc-600 flex items-center gap-1'><TriangleAlert size={15} />Criminal Cases</span>
          <span className={`font-medium text-red-700 text-lg 
            ${cases == 0 ? "bg-green-400 text-white" : "bg-red-400 text-white"} px-3 rounded-md`
          }>{cases}</span>
        </div>

        <div >
          <h3 className="text-sm text-zinc-500 font-medium mt-6">Education: </h3>
          <p className=" text[16px] mt-1 text-zinc-600 font-semibold">{education}</p>
        </div>

        {showResult && (
          <>
            <div className=" flex justify-center mt-5">
              <div
                className={`inline-flex items-center  gap-2 rounded-md px-3 py-1 text-xs font-bold ${winner
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {winner ? (
                  <>
                    <CircleCheckBig size={14} />
                    <span>Won by {votePercent}% votes</span>
                  </>
                ) : (
                  <>
                    <TriangleAlert size={14} />
                    <span>Lost by {votePercent}% votes</span>
                  </>
                )}
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 w-full rounded-full bg-zinc-200 overflow-hidden">
                <div
                  className={`h-full ${winner ? "bg-green-600" : "bg-red-500"
                    }`}
                />
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default CandidateCard;

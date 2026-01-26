import React from "react";
import ApplicationTable from "../AdminComponets/ApplicationTable";

const CandidateApplications = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Candidate Applications
      </h1>
      <ApplicationTable />
    </>
  );
};

export default CandidateApplications;

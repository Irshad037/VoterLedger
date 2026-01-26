import React from "react";
import DiscoverElections from "../components/Election/DiscoverElections";
import ElectionCandidate from "../components/Election/ElectionCandidate";
import CandidateInfo from "../components/Election/CandidateInfo";
import FundDashboard from "../components/Election/FundDashboard";
import Home from "../components/MainComponents/Home";

import AdminLayout from "../components/Admin/AdminPages/AdminLayout";
import AdminDashboard from "../components/Admin/AdminPages/AdminDashboard";
import ElectionsPage from "../components/Admin/AdminPages/ElectionsPage";
import CandidateApplications from "../components/Admin/AdminPages/CandidateApplications";
import ReportsLogs from "../components/Admin/AdminPages/ReportsLogs";

import CandidateLayout from "../components/Candidate/CandidatePage/CandidateLayout";
import CandidateDashboard from "../components/Candidate/CandidatePage/CandidateDashboard";
import CandidateProfile from "../components/Candidate/CandidatePage/CandidateProfile";
import Manifesto from "../components/Candidate/CandidatePage/Manifesto";
import AllApplication from "../components/Candidate/CandidatePage/AllApplication";
import ApplicationStatus from "../components/Candidate/CandidatePage/ApplicationStatus";
import SignupPage from "../components/Auth/SignupPage";
import LoginPage from "../components/Auth/LoginPage";


import AdminRoute from "../components/Auth/AdminRoute";
import CandidateRoute from "../components/Auth/CandidateRoute";
import AuthRedirectRoute from "../components/Auth/AuthRedirectRoute";


export const routes = [
  {
    path: "/login",
    element: (
      <AuthRedirectRoute>
        <LoginPage />
      </AuthRedirectRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRedirectRoute>
        <SignupPage />
      </AuthRedirectRoute>
    ),
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/elections",
    element: <DiscoverElections />,
  },
  {
    path: "/elections/:electionId/candidate",
    element: <ElectionCandidate />,
  },
  {
    path: "/elections/:electionId/candidate/:candidateId",
    element: <CandidateInfo />,
  },
  {
    path: "/elections/:electionId/candidate/:candidateId/fund",
    element: <FundDashboard />,
  },

  // ADMIN ROUTES
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "elections", element: <ElectionsPage /> },
      { path: "elections/:electionId/applications", element: <CandidateApplications /> },
      { path: "reports", element: <ReportsLogs /> },
    ],
  },

  // Candidate ROUTES
  {
    path: "/candidate",
    element: (
      <CandidateRoute>
        <CandidateLayout />
      </CandidateRoute>
    ),
    children: [
      { index: true, element: <CandidateDashboard /> },
      { path: "profile", element: <CandidateProfile /> },
      { path: "manifesto", element: <Manifesto /> },
      { path: "apply", element: <AllApplication /> },
      { path: "status", element: <ApplicationStatus /> },
    ],
  },

];

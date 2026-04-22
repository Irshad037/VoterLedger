import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ApiRoutes from "../../utils/ApisRoute";
import { useAuth } from "../auth/useAuth";

export const UseElection = () => {
  const {user} = useAuth()
  const adminId = user?._id;

  const allElections = useQuery({
    queryKey: ["allElections"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        ApiRoutes.Election.ALL_ELECTION
      );
      return res.data.data; // adjust if backend response differs
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to load elections"
      );
    },
  });
  const allElectionsById = useQuery({
    queryKey: ["allElectionsByAdmin", adminId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        ApiRoutes.Election.ALL_ELECTIONBYId(adminId)
      );
      return res.data.data;
    },
    enabled: !!adminId, // ✅ PREVENTS EARLY CALL
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to load elections"
      );
    },
  });

  return { 
    allElections,
    allElectionsById
   };
};

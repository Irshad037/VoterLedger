import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ApiRoutes from "../../utils/ApisRoute";

export const UseApplication = () => {
  const queryClient = useQueryClient();

  /* =========================
     APPLY FOR ELECTION
     ========================= */
  const applyForElection = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post(
        ApiRoutes.Application.APPLY,
        payload
      );
      return res.data;
    },

    onSuccess: () => {
      toast.success("Application submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["myApplications"] });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to apply for election"
      );
    },
  });

  /* =========================
     GET MY APPLICATIONS
     ========================= */
  const myApplications = useQuery({
    queryKey: ["myApplications"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        ApiRoutes.Application.MY_APPLICATIONS
      );
      return res.data.data;
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to load applications"
      );
    },
  });

  return {
    applyForElection,
    myApplications,
  };
};

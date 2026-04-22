import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ApiRoutes from "../../utils/ApisRoute";

export const UsecandidateProfile = () => {
    const queryClient = useQueryClient();

    const profile = useMutation({
        mutationFn: async (payload) => {
            const res = await axiosInstance.put(
                ApiRoutes.Canididate.PROFILE,
                payload,
            );

            return res.data;
        },

        onSuccess: () => {
            toast.success("Profile saved successfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },

        onError: (error) => {
            toast.error(error.response?.data?.message || "Profile update failed");
        },
    });

    return { profile };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ApiRoutes from "../../utils/ApisRoute";

export const useAuth = () => {
  const queryClient = useQueryClient();

  // 🔐 Authenticated user
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(ApiRoutes.AUTHS.CHECKAUTH);
        return res.data;
      } catch {
        return null; // not logged in
      }
    },
    retry: false,
  });

  // 📝 Signup
  const signupMutation = useMutation({
    mutationFn: async ({ firstName, lastName, email, password }) => {
      const res = await axiosInstance.post(ApiRoutes.AUTHS.SIGNUP, {
        firstName,
        lastName,
        email,
        password,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Signup successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Signup failed");
    },
  });

  // 🔑 Login
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await axiosInstance.post(ApiRoutes.AUTHS.LOGIN, {
        email,
        password,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Login successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Login failed");
    },
  });

  // 🚪 Logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.post(ApiRoutes.AUTHS.LOGOUT);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Logout successful");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Logout failed");
    },
  });

  return {
    user: authUser.data,
    isAuthenticated: !!authUser.data,
    isAuthLoading: authUser.isLoading,

    signupMutation,
    loginMutation,
    logoutMutation,
  };
};

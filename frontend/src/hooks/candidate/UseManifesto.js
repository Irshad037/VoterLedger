import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import ApiRoutes from "../../utils/ApisRoute";

export const UseManifesto = () => {
  const queryClient = useQueryClient();

  /* ---------------- CREATE ---------------- */
  const createManifesto = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosInstance.post(
        ApiRoutes.Manifesto.create,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Manifesto created");
      queryClient.invalidateQueries({ queryKey: ["myManifestos"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Create failed");
    },
  });

  /* ---------------- UPDATE ---------------- */
  const updateManifesto = useMutation({
    mutationFn: async ({ id, payload }) => {
      const res = await axiosInstance.put(
        `${ApiRoutes.Manifesto.update}/${id}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Manifesto updated");
      queryClient.invalidateQueries({ queryKey: ["myManifestos"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Update failed");
    },
  });

  /* ---------------- DELETE ---------------- */
  const deleteManifesto = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(
        `${ApiRoutes.Manifesto.delete}/${id}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Manifesto deleted");
      queryClient.invalidateQueries({ queryKey: ["myManifestos"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Delete failed");
    },
  });

  /* ---------------- GET MY MANIFESTOS ---------------- */
  const myManifestos = useQuery({
    queryKey: ["myManifestos"],
    queryFn: async () => {
      const res = await axiosInstance.get(ApiRoutes.Manifesto.my);
      return res.data.data;
    },
  });

  return {
    createManifesto,
    updateManifesto,
    deleteManifesto,
    myManifestos,
  };
};

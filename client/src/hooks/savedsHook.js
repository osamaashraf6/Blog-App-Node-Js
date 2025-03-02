import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOneSaved,
  deleteOneSaved,
  getAllSavedOfUser,
} from "../services/savedsService";
const useSaved = () => {
  const queryClient = useQueryClient();

  // ! createOne
  const createOneSavedMutation = useMutation({
    mutationFn: createOneSaved,
    onSuccess: () => {
      queryClient.invalidateQueries(["saveds"]);
    },
  });
  // ! getAll without filter
  const getAllSavedQuery = useQuery({
    queryKey: ["saveds"],
    queryFn: getAllSavedOfUser,
  });
  // ! deleteOne
  const deleteOneSavedMutation = useMutation({
    mutationFn: deleteOneSaved,
    onSuccess: () => {
      queryClient.invalidateQueries(["saveds"]);
    },
  });

  return {
    createOneSavedMutation,
    getAllSavedQuery,
    deleteOneSavedMutation,
  };
};

export default useSaved;

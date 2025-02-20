import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createOneLike,
  deleteOneLike,
  getAllLikeOfUser,
} from "../services/likesService";
const useLike = () => {
  const queryClient = useQueryClient();

  // ! createOne
  const createOneLikeMutation = useMutation({
    mutationFn: createOneLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });
  // ! getAll without filter
  // const getAllLikeQuery = useQuery({
  //   queryKey: ["likes"],
  //   queryFn: getAllLikeOfUser,
  // });
  // ! getAllLikeOfUser with filter

  const getAllLikeOfUserQuery = ({
    limit,
    page,
    sort,
    search,
    category,
    tags,
  }) => {
    return useQuery({
      queryKey: ["likes", limit, page, sort, search, category, tags],
      queryFn: () =>
        getAllLikeOfUser(limit, page, sort, search, category, tags),
      keepPreviousData: true,
    });
  };
  // ! deleteOne
  const deleteOneLikeMutation = useMutation({
    mutationFn: deleteOneLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    },
  });

  return {
    createOneLikeMutation,
    // getAllLikeQuery,
    getAllLikeOfUserQuery,
    deleteOneLikeMutation,
  };
};

export default useLike;

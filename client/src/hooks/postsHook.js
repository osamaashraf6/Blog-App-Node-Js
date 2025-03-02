// src/hooks/useTodo.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOnePost,
  deleteOnePost,
  getAllPost,
  getOnePost,
  updateOnePost,
} from "../services/postsService";

const usePost = () => {
  const queryClient = useQueryClient();

  // !  createOne
  const createOnePostMutation = useMutation({
    mutationFn: createOnePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // ! getAll with filter
  const useGetAllPostQuery = ({ limit, page, sort, search, category, tags }) => {
    return useQuery({
      queryKey: ["posts", limit, page, sort, search, category, tags],
      queryFn: () => getAllPost(limit, page, sort, search, category, tags),
      keepPreviousData: true,
    });
  };

  // ! getAll without filter : if you uncomment it although you don't use it it will thorow error in the browser and the network tab continuously generate error
  // const postsQuery = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: getAllTodos,
  // });

  // !  getOne
  const useGetOnePostQuery = (id) => {
    return useQuery({
      queryKey: ["post", id],
      queryFn: () => getOnePost(id),
      enabled: !!id,
    });
  };
  // !  updateOne
  const updateOnePostMutation = useMutation({
    mutationFn: updateOnePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  // !  deleteOne
  const deleteOnePostMutation = useMutation({
    mutationFn: deleteOnePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return {
    createOnePostMutation,
    useGetAllPostQuery,
    useGetOnePostQuery,
    updateOnePostMutation,
    deleteOnePostMutation,
  };
};

export default usePost;

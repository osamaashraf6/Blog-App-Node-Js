// src/hooks/useTodo.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOneComment,
  getAllCommentOfPost,
  updateOneComment,
  deleteOneComment,
  getAllCommentOfUser,
} from "../services/commentsService";

const useComment = () => {
  const queryClient = useQueryClient();

  // !  createOne
  const createOneCommentMutation = useMutation({
    mutationFn: createOneComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  // ! getAll with filter
  const useGetAllCommentOfPostQuery = ({
    postId,
    limit,
    page,
    sort,
    search,
    category,
    tags,
  }) => {
    return useQuery({
      queryKey: ["comments", postId, limit, page, sort, search, category, tags],
      queryFn: () =>
        getAllCommentOfPost(postId, limit, page, sort, search, category, tags),
      keepPreviousData: true,
    });
  };
  // ! getAll with filter
  const useGetAllCommentOfUserQuery = ({
    limit,
    page,
    sort,
    search,
    category,
    tags,
  }) => {
    return useQuery({
      queryKey: ["comments", limit, page, sort, search, category, tags],
      queryFn: () =>
        getAllCommentOfUser(limit, page, sort, search, category, tags),
      keepPreviousData: true,
    });
  };

  // !  updateOne
  const updateOneCommentMutation = useMutation({
    mutationFn: updateOneComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
  // !  deleteOne
  const deleteOneCommentMutation = useMutation({
    mutationFn: deleteOneComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  return {
    createOneCommentMutation,
    useGetAllCommentOfPostQuery,
    useGetAllCommentOfUserQuery,
    updateOneCommentMutation,
    deleteOneCommentMutation,
  };
};

export default useComment;

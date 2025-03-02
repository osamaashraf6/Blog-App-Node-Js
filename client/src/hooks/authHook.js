// src/hooks/useTodo.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from "../services/authService";

const useAuth = () => {
  //   const queryClient = useQueryClient();

  // Fetch all todos
  // const todosQuery = useQuery("todos", getAllTodos);
  //   const todosQuery = useQuery({
  //     queryKey: ["todos"],
  //     queryFn: getAllTodos,
  //   });

  // Create
  const forgetPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["todos"]);
    // },
  });
  const resetCodeVerifyMutation = useMutation({
    mutationFn: verifyResetCode,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["todos"]);
    // },
  });
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["todos"]);
    // },
  });

  // Mutation to remove a todo
  //   const removeTodoMutation = useMutation({
  //     mutationFn: removeTodo,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["todos"]);
  //     },
  //   });

  return {
    forgetPasswordMutation,
    resetCodeVerifyMutation,
    resetPasswordMutation,
  };
};

export default useAuth;

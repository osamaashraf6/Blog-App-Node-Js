// src/hooks/useTodo.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProfileByHimSelf,
  updateUserProfileByUserHimSelf,
  changeUserPasswordByUserHimSelf,
  deleteUserAccountByUserHimSelf,
} from "../services/usersService";

const useUser = () => {
  const queryClient = useQueryClient();

  // !  getOne
  const useGetUserProfileByHimSelfQuery = () => {
    return useQuery({
      queryKey: ["user"],
      queryFn: getUserProfileByHimSelf,
    });
  };
  // !  updateOne
  const updateUserProfileByUserHimSelfMutation = useMutation({
    mutationFn: updateUserProfileByUserHimSelf,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  // !  updateOne
  const changeUserPasswordByUserHimSelfMutation = useMutation({
    mutationFn: changeUserPasswordByUserHimSelf,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
  // !  deleteOne
  const deleteUserAccountByUserHimSelfMutation = useMutation({
    mutationFn: deleteUserAccountByUserHimSelf,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });

  return {
    useGetUserProfileByHimSelfQuery,
    updateUserProfileByUserHimSelfMutation,
    changeUserPasswordByUserHimSelfMutation,
    deleteUserAccountByUserHimSelfMutation,
  };
};

export default useUser;

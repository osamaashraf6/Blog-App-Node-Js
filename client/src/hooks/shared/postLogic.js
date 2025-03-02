import { useNavigate, useParams } from "react-router-dom";
import usePost from "../postsHook";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const usePostLogic = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const { useGetOnePostQuery, deleteOnePostMutation } = usePost();
  const { isPending, data: post } = useGetOnePostQuery(id);
  const { isPending: deletePostLoading } = deleteOnePostMutation;
  const navigate = useNavigate();

  const handleDeleteOnePost = (id) => {
    if (!currentUser) {
      toast.error("You have to sign in first !");
    } else {
      deleteOnePostMutation.mutate(
        id,

        {
          onSuccess: (res) => {
            toast.success(res);
            navigate("/home");
          },
          onError: (res) => {
            toast.error(
              `${res?.response?.data?.error?.message}, Sign in again`
            );
          },
        }
      );
    }
  };

  return {
    post,
    isPending,
    handleDeleteOnePost,
    deletePostLoading,
  };
};
export default usePostLogic;

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useLike from "../likesHook";
import { useState } from "react";

const useLikeLogic = () => {
  const [page, setPage] = useState(1);
  const [likeId, setLikeId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const {
    createOneLikeMutation,
    useGetAllLikeOfUserQuery,
    deleteOneLikeMutation,
  } = useLike();
  const { isPending, data: likes } = useGetAllLikeOfUserQuery({
    limit: 5,
    page,
    sort: "-createdAt",
  });
  const { isPending: createLikeLoading } = createOneLikeMutation;
  const { isPending: deleteLikLoading } = deleteOneLikeMutation;

  const handleLikedBtn = (postId) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      setLikeId(postId);
      createOneLikeMutation.mutate(postId, {
        onSuccess: () => {
          toast.success("Post Has Been Liked successfully !");
        },
        onError: (res) => {
          toast.error(res?.response?.data?.errors[0]?.msg);
        },
      });
    }
  };
  const changePage = (page) => {
    setPage(page);
  };
  const handleDeleteLike = (id) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      setLikeId(id);
      deleteOneLikeMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Like deleted successfully");
        },
        onError: () => {},
      });
    }
  };
  return {
    changePage,
    handleLikedBtn,
    createLikeLoading,
    likeId,
    handleDeleteLike,
    deleteLikLoading,
    likes,
    isPending,
  };
};
export default useLikeLogic;

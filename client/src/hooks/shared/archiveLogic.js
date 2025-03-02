import useArchive from "../archivesHook";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useSavedLogic from "./savedLogic";
import { useState } from "react";

const useArchiveLogic = () => {
  const [archiveId, setArchiveId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const {
    getAllArchiveQuery,
    createOneArchiveMutation,
    deleteOneArchiveMutation,
  } = useArchive();
  const { handleUnsavedBtn, handleSavedBtn } = useSavedLogic();
  const { isPending, data: archives } = getAllArchiveQuery;
  const { isPending: deleteArchiveLoading } = deleteOneArchiveMutation;
  const { isPending: createArchiveLoading } = createOneArchiveMutation;

  const handleUnArchivedBtn = (id, postId) => {
    if (!currentUser) {
      toast.error("Sign in First");
    } else {
      setArchiveId(id);
      handleSavedBtn(postId);
      deleteOneArchiveMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Post Has Been Unarchived Successfully");
        },
        onError: (res) => {
          console.log(res);
          toast.error(
            res?.response?.data?.message +
              ", " +
              "saession terminated, sign in again"
          );
        },
      });
    }
  };
  const handleCreateOneArchiveBtn = (id, postId) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      setArchiveId(postId);
      handleUnsavedBtn(id);
      createOneArchiveMutation.mutate(postId, {
        onSuccess: () => {
          toast.success("Post Has Been Archived successfully !");
        },
        onError: (res) => {
          console.log(res);
          toast.error(res?.response?.data?.errors[0]?.msg);
        },
      });
    }
  };
  return {
    archives,
    isPending,
    handleUnArchivedBtn,
    handleCreateOneArchiveBtn,
    deleteArchiveLoading,
    createArchiveLoading,
    archiveId,
  };
};
export default useArchiveLogic;

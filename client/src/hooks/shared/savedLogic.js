import { toast } from "react-toastify";
import useSaved from "../savedsHook";
import { useSelector } from "react-redux";
import { useState } from "react";

const useSavedLogic = () => {
  const [savedId, setSavedId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { getAllSavedQuery, deleteOneSavedMutation, createOneSavedMutation } =
    useSaved();
  const { isPending, data: saveds } = getAllSavedQuery;
  const { isPending: deleteSavLoading } = deleteOneSavedMutation;
  const { isPending: createSavLoading } = createOneSavedMutation;
  const handleUnsavedBtn = (id) => {
    if (!currentUser) {
      toast.error("Sign in First");
    } else {
      setSavedId(id);
      deleteOneSavedMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Post Has Been Unsaved Successfully");
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
  const handleSavedBtn = (id) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      setSavedId(id);
      createOneSavedMutation.mutate(id, {
        onSuccess: () => {
          toast.success("Post Has Been Saved successfully !");
        },
        onError: (res) => {
          console.log(res);
          toast.error(res?.response?.data?.errors[0]?.msg);
        },
      });
    }
  };
  return {
    handleUnsavedBtn,
    deleteSavLoading,
    isPending,
    saveds,
    handleSavedBtn,
    createSavLoading,
    savedId,
  };
};
export default useSavedLogic;

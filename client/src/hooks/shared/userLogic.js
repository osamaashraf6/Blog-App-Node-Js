import useUser from "../usersHook";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
const useUserLogic = () => {
  const { currentUser } = useSelector((state) => state.user);
  const {
    useGetUserProfileByHimSelfQuery,
    updateUserProfileByUserHimSelfMutation,
    changeUserPasswordByUserHimSelfMutation,
    deleteUserAccountByUserHimSelfMutation,
  } = useUser();

  //
  const { isPending, data: user } = useGetUserProfileByHimSelfQuery(); // ! you have to put ()for calling the fn
  const { isPending: updateProLoading } =
    updateUserProfileByUserHimSelfMutation;
  const { isPending: changePassLoading } =
    changeUserPasswordByUserHimSelfMutation;
  const { isPending: deleteProLoading } =
    deleteUserAccountByUserHimSelfMutation;
  //
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    getValues: getValuesProfile,
    reset: resetProfile,
    formState: { errors: errorsProfile },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    reset: resetPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const handleUpdateUserProfile = (data) => {
    const name = getValuesProfile("name");
    const phone = getValuesProfile("phone");
    const profileImg = getValuesProfile("profileImg");

    if (!name && !phone && (!profileImg || profileImg.length === 0)) {
      toast.error("Write some thing at any input to update !");
    } else {
      if (!currentUser) {
        toast.error("Sign in first");
      } else {
        const userForm = new FormData();
        if (name) userForm.append("name", name);
        if (phone) userForm.append("phone", phone);
        if (profileImg?.length) userForm.append("profileImg", profileImg[0]);

        updateUserProfileByUserHimSelfMutation.mutate(userForm, {
          onSuccess: () => {
            toast.success("Profile Has Been Updated Successfully");
          },
          onError: () => {},
        });
        resetProfile();
      }
    }
  };
  const handleChangePassword = (data) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      changeUserPasswordByUserHimSelfMutation.mutate(data, {
        onSuccess: (res) => {
          toast.success("Password Has Been Changed Successfully");
        },
        onError: (res) => {
          toast.error(res?.response?.data?.errors[0]?.msg);
        },
      });
      resetPassword();
    }
  };

  return {
    handleChangePassword,
    handleUpdateUserProfile,
    registerPassword,
    handleSubmitPassword,
    watch,
    errorsPassword,
    errorsProfile,
    updateProLoading,
    changePassLoading,
    deleteProLoading,
    isPending,
    user,
    handleSubmitProfile,
    registerProfile,
  };
};
export default useUserLogic;

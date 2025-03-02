import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useAddress from "../addressesHook";
const useAddressLogic = () => {
  const {
    createOneAddressMutation,
    getAllAddressOfUserQuery,
    deleteOneAddressMutation,
  } = useAddress();
  const { isPending: addressLoading, data: addresses } =
    getAllAddressOfUserQuery;
  const { isPending: createAddLoading } = createOneAddressMutation;

  const { isPending: deleteAddLoading } = deleteOneAddressMutation;
  const { currentUser } = useSelector((state) => state.user);
  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    reset: resetAddress,
    formState: { errors: errorsAddress },
  } = useForm();

  const handleDeleteAddress = (addressId) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      deleteOneAddressMutation.mutate(addressId, {
        onSuccess: (res) => {
          toast.success("Address Has Been Deleted Successfully");
        },
        onError: (res) => {},
      });
    }
  };
  const handleCreateAddress = (data) => {
    if (!currentUser) {
      toast.error("Sign in first");
    } else {
      createOneAddressMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Address Has Been Created Successfully");
        },
        onError: (res) => {},
      });
      resetAddress();
    }
  };

  return {
    handleCreateAddress,
    handleDeleteAddress,
    errorsAddress,
    handleSubmitAddress,
    registerAddress,
    deleteAddLoading,
    createAddLoading,
    addressLoading,
    addresses,
  };
};
export default useAddressLogic;

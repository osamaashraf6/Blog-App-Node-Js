import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useAddress from "../../hooks/addressesHook";
const Address = () => {
  const [openCreateAddress, setOpenCreateAddress] = useState(false);
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
  //

  return (
    <>
      {/* <!-- address --> */}
      <div className="p-6 mb-16 rounded-xl bg-white shadow-lg flex flex-col gap-4">
        <h2 className="font-medium text-emerald-500 text-lg">My Addresses:</h2>
        <div className="">
          <ul className="text-slate-400 font-medium text-sm flex flex-col gap-3">
            {addressLoading ? (
              <p>Address Loading...</p>
            ) : addresses?.data?.length > 0 ? (
              addresses?.data?.map((item) => (
                <div
                  key={item?._id}
                  className="flex justify-between border-y py-2"
                >
                  <li>
                    <span className="text-yellow-600 text-[15px]">
                      Street:{" "}
                    </span>
                    {item?.street}
                    <span className="text-yellow-600 text-[15px]">City: </span>
                    {item?.city}
                    <span className="text-yellow-600 text-[15px]">State: </span>
                    {item?.state}
                    <span className="text-yellow-600 text-[15px]">
                      Postal Code:
                    </span>
                    {item?.postalCode}
                  </li>
                  <div className="">
                    <button
                      onClick={() => handleDeleteAddress(item?._id)}
                      className="border border-red-600 px-2 py-1 rounded text-red-500 text-sm"
                      disabled={deleteAddLoading}
                    >
                      {deleteAddLoading ? "Please wait.." : "Remove"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No Addresses Available</p>
            )}
          </ul>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setOpenCreateAddress(true)}
            className="px-2 py-1 rounded bg-black text-white text-sm w-[60px]"
          >
            Create
          </button>
        </div>
      </div>

      {/* <!-- Modal address create --> */}
      <div
        className={`
          ${openCreateAddress ? "flex" : "hidden"} 
             parmodal top-0 left-0 w-full h-full justify-center pt-[82px] bg-[#000000cc] z-50 fixed
          `}
      >
        <div className="parmodal_modal  bg-white w-[350px] h-[600px] pr-4 pl-10 pt-2 pb-8">
          <div className="flex justify-end">
            <button
              onClick={() => setOpenCreateAddress(false)}
              className="p-1 text-white bg-red-500 text-xs"
            >
              close
            </button>
          </div>
          <h2 className="text-2xl text-gray-300 font-bold pb-6">
            Create Address
          </h2>
          <form
            onSubmit={handleSubmitAddress(handleCreateAddress)}
            className="flex flex-col gap-4 pr-6"
          >
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                Street
              </label>
              <input
                type="text"
                name="street"
                {...registerAddress("street", {
                  required: "street is required",
                })}
                className="text-sm w-full border-0 border-b"
              />
            </div>
            {errorsAddress.street && (
              <p className="text-red-500">{errorsAddress.street.message}</p>
            )}
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                City
              </label>
              <input
                type="text"
                name="city"
                {...registerAddress("city", {
                  required: "city is required",
                })}
                className="text-sm w-full border-0 border-b"
              />
            </div>
            {errorsAddress.city && (
              <p className="text-red-500">{errorsAddress.city.message}</p>
            )}
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                State
              </label>
              <input
                type="text"
                name="state"
                {...registerAddress("state", {
                  required: "state is required",
                })}
                className="text-sm w-full border-0 border-b"
              />
            </div>
            {errorsAddress.state && (
              <p className="text-red-500">{errorsAddress.state.message}</p>
            )}
            <div className="flex flex-col">
              <label className="text-gray-400 pb-4 text-xs font-medium">
                postalCode
              </label>
              <input
                type="text"
                name="postalCode"
                {...registerAddress("postalCode", {
                  required: "postalCode is required",
                })}
                className="text-sm w-full border-0 border-b"
              />
            </div>
            {errorsAddress.postalCode && (
              <p className="text-red-500">{errorsAddress.postalCode.message}</p>
            )}
            <button
              type="submit"
              className="p-1 bg-yellow-500 text-white text-sm"
              disabled={createAddLoading}
            >
              {createAddLoading ? "Please wait..." : "Create"}
              Create
            </button>
          </form>
        </div>
      </div>

      {/* <!-- Modal address update --> */}
    </>
  );
};

export default Address;

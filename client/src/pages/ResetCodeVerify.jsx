import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/authHook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LazyLoadingBtn from "../components/LazyLoadingBtn";
const ResetCodeVerify = () => {
  const { resetCodeVerifyMutation } = useAuth();
  const { error, isPending } = resetCodeVerifyMutation;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitMethod = async (data) => {
    resetCodeVerifyMutation.mutate(
      data,

      {
        onSuccess: (res) => {
          toast.success(res?.message);
          navigate("/resetpassword");
        },
      }
    );
    // ! this is wrong as it asynch lke what happened in redux, so it reads the verify null, so the solution is to use oNSucccess from react query
    // if (localStorage.getItem("verify")) {
    //     toast.success("Email is correct, check the reset code in email ! ");
    //     navigate("/home");
    // }
  };
  return (
    <>
      <section className="parent h-screen py-24 grid place-items-center">
        <div className="wrapper w-[571px] rounded-lg">
          <div className="bg-white p-4 border">
            <h3 className="uppercase text-xl pb-4">Reset Code Verify</h3>
            <form
              onSubmit={handleSubmit(handleSubmitMethod)}
              className="flex flex-col gap-4 pb-4"
            >
              <div className="">
                <input
                  type="text"
                  className="p-2 border w-full"
                  placeholder="reset code"
                  name="resetCode"
                  {...register("resetCode", { required: "Code is required" })}
                />
              </div>
              {errors.resetCode && <p className="text-red-500">{errors.resetCode.message}</p>}

              <button
                className="uppercase bg-emerald-500 text-white p-2 px-10 text-sm w-fit"
                type="submit"
                disabled={isPending}
              >
                {isPending ? <LazyLoadingBtn /> : "Send"}
              </button>
            </form>
            {error && (
              <p style={{ color: "red" }}>
                {error?.response?.data?.message || "Something went wrong!"}
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetCodeVerify;

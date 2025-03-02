import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/authHook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LazyLoadingBtn from "../components/LazyLoadingBtn";
const ResetPassword = () => {
  const { resetPasswordMutation } = useAuth();
  const { error, isPending } = resetPasswordMutation;
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitMethod = async (data) => {
    resetPasswordMutation.mutate(
      data,

      {
        onSuccess: (res) => {
          toast.success(res?.message);
          navigate("/login");
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
            <h3 className="uppercase text-xl pb-4">Reset Passwod</h3>
            <form
              onSubmit={handleSubmit(handleSubmitMethod)}
              className="flex flex-col gap-4 pb-4"
            >
              <div className="">
                <input
                  type="password"
                  className="p-2 border w-full"
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password cannot exceed 20 characters",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must contain at least one letter and one number",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <div className="">
                <input
                  type="password"
                  className="p-2 border w-full"
                  placeholder="confirm password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
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

export default ResetPassword;

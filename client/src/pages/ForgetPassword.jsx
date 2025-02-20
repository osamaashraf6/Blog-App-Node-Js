import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/authHook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const { forgetPasswordMutation } = useAuth();
  const { error, isPending, data } = forgetPasswordMutation;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitMethod = async (data) => {
    forgetPasswordMutation.mutate(
      data,

      {
        onSuccess: (res) => {
          toast.success(res?.message);
          navigate("/resetcodeverify");
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
    <form onSubmit={handleSubmit(handleSubmitMethod)}>
      <input
        type="email"
        placeholder="enter your email"
        name="email"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit" disabled={isPending}>
        {isPending ? "Please wait..." : "Send"}
      </button>

      {/* Show error message */}
      {error && (
        <p style={{ color: "red" }}>
          {error?.response?.data?.message || "Something went wrong!"}
        </p>
      )}
    </form>
  );
};

export default ForgetPassword;

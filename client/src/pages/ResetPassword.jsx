import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/authHook";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={handleSubmit(handleSubmitMethod)}>
      <input
        type="password"
        name="password"
        placeholder="Password"
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
            message: "Password must contain at least one letter and one number",
          },
        })}
      />
      {errors.password && (
        <p className="errValidation">{errors.password.message}</p>
      )}
      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="confirmPassword"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
      </div>
      {errors.confirmPassword && (
        <p className="errValidation">{errors.confirmPassword.message}</p>
      )}
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

export default ResetPassword;

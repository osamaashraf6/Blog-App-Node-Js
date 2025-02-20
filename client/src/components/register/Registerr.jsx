import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registerr.scss";
import { useDispatch, useSelector } from "react-redux";
import { register as registerr } from "../../redux/userslice/apiCalls";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
const Registerr = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleSubmitMethod = async (data) => {
    const res = await registerr(dispatch, data);
    if (res.payload) {
      toast.success("Signed up successfully! ");
      navigate("/login");
    }

    // if (currentUser) { // ! this wrong you can not use redirect here as it will not work as you say if currentUser redirect, so the currentuser after submit is still null not updated instantly as it is not syncho, so the solution is to use asyncho with useeffect
    //   navigate("/home");
    // }
  };
  return (
    <>
      <h3 className="register-heading">Register</h3>
      <section className="register" id="register">
        <div className="wrapper">
          <form onSubmit={handleSubmit(handleSubmitMethod)}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Name cannot exceed 10 characters",
                  },
                })}
              />
            </div>
            {errors.name && (
              <p className="errValidation">{errors.name.message}</p>
            )}
            <div>
              <input
                type="text"
                name="lastname"
                placeholder="lastname"
                {...register("lastname", {
                  required: "Lastname is required",
                  minLength: {
                    value: 3,
                    message: "Lastname must be at least 3 characters",
                  },
                  maxLength: {
                    value: 10,
                    message: "Lastname cannot exceed 10 characters",
                  },
                })}
              />
            </div>
            {errors.lastname && (
              <p className="errValidation">{errors.lastname.message}</p>
            )}
            <div>
              <input
                type="text"
                name="phone"
                placeholder="phone"
                {...register("phone", {
                  required: "phone is required",
                })}
              />
            </div>
            {errors.phone && (
              <p className="errValidation">{errors.phone.message}</p>
            )}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="errValidation">{errors.email.message}</p>
            )}
            <div>
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
                    message:
                      "Password must contain at least one letter and one number",
                  },
                })}
              />
            </div>
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
            <button type="submit" disabled={isFetching}>
              {isFetching ? "Please wait !" : "Register"}
            </button>
          </form>
          {error?.msg && <p style={{ color: "red" }}>{error.msg}</p>}
          {/* {error &&
            error.map((err, i) => (
              <div key={i + 1}>
                <p style={{ color: "red" }}>{err.msg}</p>
              </div>
            ))} */}
          <span>Do you have an account? </span>
          <Link to="/login">Login.</Link>
        </div>
      </section>
    </>
  );
};

export default Registerr;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/userslice/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import "../register/Registerr.scss";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const Loginn = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);
  // const handleSubmitMethod = async (e, data) => { //! don't need e event as react hook form already prevents reload page
  const handleSubmitMethod = async (data) => {
    // const res = await login(dispatch, { email, password });
    const res = await login(dispatch, data);
    if (res.payload) {
      toast.success("Signed in successfully! ");
      navigate("/home");
    }


    // if (currentUser) { // ! this wrong you can not use redirect here as it will not work as you say if currentUser redirect, so the currentuser after submit is still null not updated instantly as it is not syncho, so the solution is to use asyncho with useeffect
    //   navigate("/home");
    // }
  };

  return (
    <>
      <h3 className="login-heading">Login</h3>
      <section className="register" id="register">
        <div className="wrapper">
          <form onSubmit={handleSubmit(handleSubmitMethod)}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="email"
                // onChange={(e) => setEmail(e.target.value)}
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && <p>{errors.email.message}</p>}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                // onChange={(e) => setPassword(e.target.value)}
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
            {errors.password && <p>{errors.password.message}</p>}
            <button type="submit" disabled={isFetching}>
              {isFetching ? "Logging in..." : "Login"}
            </button>
          </form>
          {/* // ! this make error as it does not know {error} this error from validation or redux */}
          {error?.message && <p style={{ color: "red" }}>{error.message}</p>}
          <span>Don't you have an account? </span>
          <Link to="/">Register.</Link>
          <p>
            <Link to="/forgetpassword">Forget Password.</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Loginn;

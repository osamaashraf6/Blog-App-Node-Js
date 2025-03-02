import React from "react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "../assets/lotti/notfoundpage.json";
const Error = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const error = useRouteError();
  let errorStatus;
  let errorMessage;

  if (isRouteErrorResponse(error)) {
    // ! if error in route
    errorStatus = error.status;
    errorMessage = error.statusText;
  } else {
    // ! if page not found

    errorStatus = 404;
    errorMessage = "PageNotFound";
  }
  return (
    <>
      <div className="absolute left-0 top-0 w-full h-full grid place-items-center bg-white">
        <div className="w-96 h-96">
          <Lottie options={defaultOptions} />
        </div>
        <div>
          <h1 className="text-[128px] font-bold">{errorStatus}</h1>
          <div className="text-blue-400 font-medium">{errorMessage}</div>
          <Link
            to="/"
            replace={true}
            className="text-blue-600 font-medium text-2xl"
          >
            Go back to home
          </Link>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default Error;

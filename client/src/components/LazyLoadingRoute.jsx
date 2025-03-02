import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/lotti/Animation - 1740129437005.json";
const LazyLoadingRoute = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div className="absolute left-0 top-0 w-full h-full grid place-items-center bg-white">
        <div className="w-96 h-96">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </>
  );
};

export default LazyLoadingRoute;

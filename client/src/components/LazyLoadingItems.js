import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/lotti/itemsloading.json";
const LazyLoadingItems = () => {
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
      <div className="w-full grid place-items-center bg-white">
        <div className="w-28 h-28">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </>
  );
};

export default LazyLoadingItems;

import React from "react";
import Lottie from "react-lottie";
// import * as LoadingJSON from "../animation/loading.json";
export default function Loading() {
  return (
    <lottie-player
      src="https://assets3.lottiefiles.com/packages/lf20_iwmd6pyr.json"
      background="transparent"
      speed="1"
      style={{ width: 100, margin: "auto" }}
      loop
      autoplay
    ></lottie-player>
  );
}

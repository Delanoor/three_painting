import { useProgress, Html } from "@react-three/drei";
import React from "react";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

export default Loader;

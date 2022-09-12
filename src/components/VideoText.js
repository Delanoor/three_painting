import * as THREE from "three";
import { useState } from "react";
import { Text } from "@react-three/drei";

function VideoText({ ...props }) {
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "/intro_video_edited.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });
  return (
    <Text fontSize={3} {...props}>
      THREE
      <meshBasicMaterial toneMapped={false}>
        <videoTexture
          attach="map"
          args={[video]}
          encoding={THREE.sRGBEncoding}
        />
      </meshBasicMaterial>
    </Text>
  );
}

export default VideoText;

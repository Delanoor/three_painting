import * as THREE from "three";
import "./App.css";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import {
  AccumulativeShadows,
  RandomizedLight,
  Text,
  OrbitControls,
  Environment,
  shaderMaterial,
} from "@react-three/drei";

import { useControls } from "leva";
import { forwardRef, Suspense, useEffect, useRef, useState } from "react";
import WaveBackground from "./components/WaveBackground";
import { motion } from "framer-motion-3d";
import Ground from "./components/Ground";
import VideoText from "./components/VideoText";

export default function App() {
  const value = useControls({
    // bg: {
    //   value: "#e79f03",
    //   label: "background",
    //   onChange: (v) => {
    //     canvasRef.current.style.backgroundColor = v;
    //   },
    // },
    box: {
      value: "#cd5c5c",
      label: "box",
      transient: false,
      onChange: (v) => {
        boxRef.current = v;
      },
    },
    ground: {
      value: "#a0a0a0",
      transient: false,
      onChange: (v) => {
        groundRef.current = v;
      },
    },
  });

  // const canvasRef = useRef(null);

  const boxRef = useRef("#cd5c5c");
  const groundRef = useRef("#a0a0a0");

  // const [video] = useState(() =>
  //   Object.assign(document.createElement("video"), {
  //     src: "/intro_video_edited.mp4",
  //     crossOrigin: "Anonymous",
  //     loop: true,

  //   })
  // );

  return (
    <>
      {/* <h1>Hello</h1> */}
      <Canvas
        pixelRatio={[1, 1.5]}
        // ref={canvasRef}
        shadows
        camera={{ position: [0, 3, 10], fov: 15 }}
      >
        <color attach="background" args={["black"]} />
        <fog attach="fog" args={["black", 15, 20]} />
        {/* <OrbitControls
          autoRotate={false}
          target={[0, -0.24, 1]}
          maxPolarAngle={Math.PI / 2}
          minDistance={5}
          maxDistance={80}
        /> */}

        <Suspense fallback={false}>
          {/* <WaveBackground /> */}
          <group position={[0, -1, 0]}>
            <VideoText position={[0, 1.3, -2]} />
            <Ground />
          </group>
          <ambientLight intensity={0.5} />
          <spotLight position={[0, 10, 0]} intensity={0.3} />
          <directionalLight position={[-50, 0, -40]} intensity={0.7} />
          {/* <Environment preset="city" /> */}
        </Suspense>
        <CustomCam />
      </Canvas>
    </>
  );
}

function CustomCam() {
  const [vec] = useState(() => new THREE.Vector3());

  return useFrame((state) => {
    state.camera.position.lerp(
      vec.set(state.mouse.x * 7, 3 + state.mouse.y * 2, 14),
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });
}

import "./App.css";
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber";
import {
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
  shaderMaterial,
} from "@react-three/drei";

import { useControls } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import WaveBackground from "./components/WaveBackground";
import { motion } from "framer-motion-3d";
import Ground from "./components/Ground";

function App() {
  const value = useControls({
    bg: {
      value: "#e79f03",
      label: "background",
      onChange: (v) => {
        canvasRef.current.style.backgroundColor = v;
      },
    },
    box: {
      value: "#cd5c5c",
      label: "box",
      transient: false,
      onChange: (v) => {
        boxRef.current = v;
      },
    },
    ground: {
      value: "#212121",
      transient: false,
      onChange: (v) => {
        groundRef.current = v;
      },
    },
  });

  const canvasRef = useRef(null);

  const boxRef = useRef("#cd5c5c");
  const groundRef = useRef("#00fff5");

  return (
    <>
      <h1>Hello</h1>
      <Canvas
        dpr={[1, 2]}
        ref={canvasRef}
        shadows
        camera={{ position: [0, 5.5, 11], fov: 25 }}
      >
        <Suspense fallback={false}>
          {/* <AccumulativeShadows
            temporal
            frames={100}
            color="black"
            colorBlend={2}
            toneMapped={true}
            alphaTest={0.9}
            opacity={2}
            scale={12}
            position={[0, -0.5, 0]}
          >
            <RandomizedLight
              amount={8}
              radius={4}
              ambient={0.5}
              intensity={1}
              position={[5, 5, -10]}
              bias={0.001}
            />
          </AccumulativeShadows> */}
          <OrbitControls
            autoRotate={false}
            target={[0, -0.24, 1]}
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={80}
          />

          <pointLight position={[0, 10, 0]} />

          <motion.mesh
            whileHover={{ scale: 1.1 }}
            castShadow
            position={[0, -0.24, 1]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            {/* <meshStandardMaterial color={boxRef.current} /> */}
            <meshToonMaterial color={boxRef.current} />
          </motion.mesh>

          <WaveBackground />
          <Ground ref={groundRef} groundColor={groundRef.current} />

          {/* <Environment preset="city" /> */}
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;

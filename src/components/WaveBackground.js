import * as THREE from "three";
import { useRef } from "react";
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import { extend, useFrame, useLoader } from "@react-three/fiber";

function WaveBackground() {
  const WaveShaderMaterial = shaderMaterial(
    //uniform
    {
      uTime: 0,
      uColor: new THREE.Color(0.0, 0.4, 1.0, 1),
      uTexture: new THREE.Texture(),
    },

    // vertex
    glsl`
      precision mediump float;

      varying vec2 vUv;
      varying float vWave;

      uniform float uTime;

      #pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

      void main() {
        vUv = uv;

        vec3 pos = position;
        float noiseFreq = 1.8;
        float noiseAmp = 0.1;
        vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
        pos.z += snoise3(noisePos) * noiseAmp;
        vWave = pos.z;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,

    // fragment shader
    glsl`
      precision mediump float;
      uniform vec3 uColor;
      uniform float uTime;
      uniform sampler2D uTexture;

      varying vec2 vUv;
      varying float vWave;

      void main() {
        float wave = vWave * 0.1;
        vec3 texture =texture2D(uTexture, vUv + wave).rgb;
        gl_FragColor = vec4(texture, 1.0);
      }
    `
  );
  extend({ WaveShaderMaterial });

  const Wave = () => {
    const waveRef = useRef();
    const [image] = useLoader(THREE.TextureLoader, [
      "https://images.unsplash.com/photo-1661863253432-b4f50c80ced2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
    ]);
    useFrame(({ clock }) => (waveRef.current.uTime = clock.getElapsedTime()));
    return (
      <mesh>
        <planeBufferGeometry args={[3, 5, 16, 16]} />
        <waveShaderMaterial ref={waveRef} uTexture={image} side={2} />
      </mesh>
    );
  };

  return <Wave />;
}

export default WaveBackground;

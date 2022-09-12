import { Reflector, useTexture } from "@react-three/drei";

function Ground() {
  const [floor, normal] = useTexture([
    "/surface_imperfection_var.jpg",
    "/surface_imperfection_normal.jpg",
  ]);
  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[10, 10]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5} // reflection strength
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material
          color="#a0a0a0"
          metalness={0.4}
          roughness={0.1}
          normalScale={[2, 2]}
          side={2}
          roughnessMap={floor}
          normalMap={normal}
          {...props}
        />
      )}
    </Reflector>
  );
}

export default Ground;

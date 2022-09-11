import { Reflector } from "@react-three/drei";

function Ground({ groundColor }) {
  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[100, 100]}
      mirror={0.2}
      mixBlur={6}
      mixStrength={3.5} // reflection strength
      position={[0, -3, 0]}
      rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    >
      {(Material, props) => (
        <Material
          color={groundColor}
          metalness={0.9}
          roughness={0.1}
          side={2}
          {...props}
        />
      )}
    </Reflector>
  );
}

export default Ground;

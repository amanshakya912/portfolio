import { Canvas } from "@react-three/fiber";

const ThreeJSPage = () => {
  return (
    <div id="canvas-container">
      <Canvas>
        <mesh>
          <boxGeometry args={[5, 5, 2]} />
          <meshPhongMaterial />
        </mesh>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 5]} color="red" />
      </Canvas>
    </div>
  );
};

export default ThreeJSPage;

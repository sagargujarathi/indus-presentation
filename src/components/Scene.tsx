import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import styles from "./Scene.module.css";  // Add this import

interface ModelProps {
  path: string;
}

function Model({ path }: ModelProps) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

interface SceneProps {
  modelPath: string;
}

const Scene = ({ modelPath }: SceneProps) => {
  return (
    <div className={styles.sceneContainer}>
      <Canvas 
        style={{ height: "500px" }}
        shadows={false}  // Disable shadows
        flat  // Enable flat tonemap
      >
        <PerspectiveCamera makeDefault position={[20, 20, 20]} fov={45} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={100}
          // Removed maxPolarAngle to allow full rotation
          target={[0, 0, 0]}
        />

        {/* Simplified lighting for flat appearance */}
        <ambientLight intensity={1.5} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={0.5} 
          castShadow={false}
        />

        <Suspense fallback={null}>
          <Model path={modelPath} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;

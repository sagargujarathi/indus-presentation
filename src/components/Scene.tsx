import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  Center,
} from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import styles from "./Scene.module.css";

interface ModelProps {
  path: string;
  zoom?: number;
  center?: [number, number, number];
}

function Model({ path, zoom = 1, center = [0, 0, 0] }: ModelProps) {
  const { scene } = useGLTF(path);
  return (
    <Center>
      <primitive object={scene} scale={zoom} position={center} />
    </Center>
  );
}

interface SceneProps {
  modelPath: string;
  zoom?: number;
  center?: [number, number, number];
}

const Scene = ({ modelPath, zoom = 1, center: initialCenter = [0, 0, 0] }: SceneProps) => {
  const controlsRef = useRef();
  const [center, setCenter] = useState<[number, number, number]>(initialCenter);
  const cameraDistance = Math.max(100 / zoom, 50);

  useEffect(() => {
    const moveStep = 5;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'ArrowLeft':
          setCenter(([x, y, z]) => [x - moveStep, y, z]);
          break;
        case 'ArrowRight':
          setCenter(([x, y, z]) => [x + moveStep, y, z]);
          break;
        case 'ArrowUp':
          setCenter(([x, y, z]) => [x, y + moveStep, z]);
          break;
        case 'ArrowDown':
          setCenter(([x, y, z]) => [x, y - moveStep, z]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.sceneContainer}>
      <Canvas 
        style={{ height: "500px" }} 
        shadows={false} 
        flat
      >
        <PerspectiveCamera 
          makeDefault 
          position={[
            center[0] + cameraDistance, 
            center[1] + cameraDistance, 
            center[2] + cameraDistance
          ]} 
          fov={40} 
        />
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          minDistance={30}
          maxDistance={300}
          enableRotate={true}
          rotateSpeed={1}
          zoomSpeed={1}
          panSpeed={1}
          target={center}
          makeDefault
        />

        <ambientLight intensity={1.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={0.5}
          castShadow={false}
        />

        <Suspense fallback={null}>
          <Model path={modelPath} zoom={zoom} center={center} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;

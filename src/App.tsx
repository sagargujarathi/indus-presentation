import ModelViewer from "./components/ModelViewer";
import "./styles.css";

const App = () => {
  return (
    <div
      className="app"
      style={{
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "16px",
          background: "black",
          color: "white",
          fontSize: "1.5rem",
        }}
      >
        TEAM INDUS TEAM ID: 3172
      </div>

      <ModelViewer
        modelPath="/models/CANSAT.gltf"
        zoom={0.35}
        initialRotation={{ x: 70, y: 60 }}
        title="CANSAT"
        description="Advanced CanSat design with cutting-edge sensors and deployment system"
      />

      <ModelViewer
        modelPath="/models/CANSAT_CONTAINER.glb"
        title="CANSAT CONTAINER"
        zoom={0.35}
        initialRotation={{ x: 70, y: 60 }}
        description="Advanced CanSat design with cutting-edge sensors and deployment system"
      />

      <ModelViewer
        modelPath="/models/CANSAT_FOLDED.glb"
        title="CANSAT CONTAINER"
        zoom={0.35}
        description="Advanced CanSat design with cutting-edge sensors and deployment system"
      />
    </div>
  );
};

export default App;

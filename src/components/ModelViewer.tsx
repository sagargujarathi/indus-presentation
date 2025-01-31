import Scene from "./Scene";
import styles from "./ModelViewer.module.css";

interface ModelViewerProps {
  title: string;
  modelPath: string;
  description?: string;
}

const ModelViewer = ({ title, modelPath, description }: ModelViewerProps) => {
  return (
    <div
      className={styles.container}
      style={{ width: "100%", marginTop: "16px" }}
    >
      <div className={styles.titleSection}>
        <h2>{title}</h2>
      </div>
      <div className={styles.modelSection}>
        <Scene modelPath={modelPath} />
      </div>
      {description && (
        <div className={styles.descriptionSection}>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default ModelViewer;

import React from "react";
import styles from "./sound-toggle.module.css";
import { useAppContext } from "../../hooks/useAppContext";

const SoundToggle: React.FC = () => {
  const { isSoundOn, setIsSoundOn } = useAppContext();

  return (
    <button
      className={styles.soundToggle}
      onClick={() => setIsSoundOn(!isSoundOn)}
    >
      {isSoundOn ? "🔊" : "🔇"}
    </button>   
  );
};

export default SoundToggle;

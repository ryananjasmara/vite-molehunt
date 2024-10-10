import React, { useEffect, useRef, useState } from "react";
import { GameEngine } from "./engine/GameEngine";
import { useAppContext } from "../hooks/useAppContext";
import styles from "./game.module.css";

interface GameProps {
  onToGameOver: () => void;
  onBackToMenu: () => void;
}

const Game: React.FC<GameProps> = ({ onToGameOver, onBackToMenu }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { score, setScore, timer, setTimer, isSoundOn } = useAppContext();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const engineRef = useRef<GameEngine | null>(null);

  useEffect(() => {
    if (timer === 1) {
      setTimeout(() => {
        if (engineRef.current) {
          engineRef.current.stop();
        }
        onToGameOver();
      }, 1000);
    }
  }, [timer, onToGameOver]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const width = Math.min(window.innerWidth, 600);
      const height = Math.min(window.innerHeight, 600);
      setCanvasSize({ width, height });
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || canvasSize.width === 0 || canvasSize.height === 0)
      return;

    const gameEngine = new GameEngine(
      "game-canvas",
      setScore,
      setTimer,
      canvasSize.width,
      canvasSize.height
    );
    engineRef.current = gameEngine;
    gameEngine.start().catch(console.error);

    return () => {
      engineRef.current?.cleanup();
    };
  }, [canvasSize, setScore, setTimer]);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.isSoundOn = isSoundOn;
    }
  }, [isSoundOn]);

  return (
    <div className={`${styles.main} ${styles.noSelect}`}>
      <div className={styles.scoreboard}>
        <p>Score: {score}</p>
      </div>
      <div className={styles.timer}>
        <p>Time Left: {timer}</p>
      </div>
      <canvas
        role="canvas"
        id="game-canvas"
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
      <button className={styles.button} onClick={onBackToMenu}>
        Back to Menu
      </button>
    </div>
  );
};

export default Game;

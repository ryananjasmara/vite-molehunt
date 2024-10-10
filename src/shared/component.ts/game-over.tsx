import { useState } from "react";
import styles from "./game-over.module.css";
import { useAppContext } from "../../hooks/useAppContext";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/storage";
import { ILeaderboard } from "../types/leaderboard.type";

interface GameOverProps {
  onBackToMenu: () => void;
}

function GameOver({ onBackToMenu }: GameOverProps) {
  const [playerName, setPlayerName] = useState("");

  const { score } = useAppContext();

  const handleSubmit = () => {
    let data: ILeaderboard[] = getLocalStorageItem("leaderboards", []);

    const newEntry: ILeaderboard = {
      name: playerName || "No Name",
      score,
      rank: 0,
    };

    data = data.filter((entry) => entry.name !== newEntry.name);

    data.push(newEntry);

    data.sort((a, b) => b.score - a.score);

    data = data.slice(0, 10).map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    setLocalStorageItem("leaderboards", data);

    onBackToMenu();
  };

  return (
    <main className={styles.main}>
      <h1>Game Over</h1>
      <p>Your final score: {score}</p>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        className={styles.input}
      />
      <button className={styles.button} onClick={handleSubmit}>
        Submit Score
      </button>
      <button className={styles.button} onClick={onBackToMenu}>
        Back to Menu
      </button>
    </main>
  );
}

export default GameOver;

import React, { useState } from 'react';
import Game from './game/Game';
import './App.css';
import { Menu } from './shared/types/menu';
import GameOver from './shared/component.ts/game-over';
import Leaderboard from './shared/component.ts/leaderboard';
import MainMenu from './shared/component.ts/main-menu';
import SoundToggle from './shared/component.ts/sound-toggle';
const App: React.FC = () => {
  const [menu, setMenu] = useState<Menu>('menu');

  const handleBackToMenu = () => {
    setMenu('menu');
  };

  const handleStartGame = () => {
    setMenu('playing');
  };

  const handleShowLeaderboard = () => {
    setMenu('leaderboard');
  };

  const handleToGameOver = () => {
    setMenu('gameOver');
  };

  return (
    <div className="App">
      <SoundToggle />
      {menu === 'menu' && <MainMenu onStartGame={handleStartGame} onShowLeaderboard={handleShowLeaderboard} />}
      {menu === 'playing' && <Game onToGameOver={handleToGameOver} onBackToMenu={handleBackToMenu} />}
      {menu === 'gameOver' && <GameOver onBackToMenu={handleBackToMenu} />}
      {menu === 'leaderboard' && <Leaderboard onBackToMenu={handleBackToMenu} />}
    </div>
  );
};

export default App;
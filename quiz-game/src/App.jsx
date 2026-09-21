import { useEffect, useState } from 'react'
import './index.css'
import { GameHeader } from './components/GameHeader';
import { Card } from './components/Card';
import { WinMessage } from './components/WinMessage';
import { useGameLogic } from './hooks/useGameLogic';

const cardValues = [
"🍎",
"🍌",
"🍇",
"🍊",
"🍓",
"🥝",
"🍑",
"🍒",
"🍎",
"🍌",
"🍇",
"🍊",
"🍓",
"🥝",
"🍑",
"🍒",
];

function App() {
  const {cards, score, moves,isGameComplete, initializeGame, handleCardClick} = useGameLogic(cardValues)

  return (
<div className="app">
    <GameHeader score={score} moves={moves} onReset={initializeGame}/>
      {isGameComplete && <WinMessage moves={moves}/>}
    <div className="cards-grid">
      {cards.map((card, index) => (<Card card={card} key={index} onClick={handleCardClick} />))}
    </div>
</div>
  )
}

export default App

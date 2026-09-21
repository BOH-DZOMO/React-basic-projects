import { useEffect, useState } from 'react'


export const useGameLogic = (cardValues) => {
    const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isLocked,setIsLocked] = useState(false)

  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length-1 ; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled;
  }

       useEffect(() => {
      initializeGame()
     },[])

  const initializeGame = () => {
     //logic for random cards

    const shuffled = shuffleArray(cardValues)
     const finalCards = shuffled.map((value, index) => {
      return {
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }
     })
     setCards(finalCards)

    setScore(0)
    setMoves(0)
    setIsLocked(false)
    setFlippedCards([])
    setMatchedCards([])
  }

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2){
        return;
    }
    const newCards = cards.map((c) => (c.id === card.id ? {...c,isFlipped:true} : c))
    setCards(newCards)

    const newFlippedCards = [...flippedCards,card.id]
    setFlippedCards(newFlippedCards)
    if (flippedCards.length === 1){
      const firstCard = cards[flippedCards[0]]
      setIsLocked(true)
      if (firstCard.value === card.value){
        setTimeout(()=>{
        setMatchedCards((prev) => ([...prev,firstCard.id,card.id]))
        setScore((prev) => prev + 1 )
        setCards((prev) => (prev.map((c) => ((c.id ===card.id || c.id === firstCard.id) ? {...c,isMatched:true} : c))))
       setFlippedCards([])
       setIsLocked(false)
        },500)

      }else{
       setTimeout(()=>{
           const flippedBackCards = newCards.map((c) => ((newFlippedCards.includes(c.id) || c.id ===card.id) ? {...c,isFlipped:false} : c))
        setCards(flippedBackCards)
        setFlippedCards([])
         setIsLocked(false)
       },500)
      }

      
    }
    setMoves((prev) => prev + 1);
  }

  const isGameComplete = matchedCards.length === cardValues.length

  return {cards, score, moves,isGameComplete,handleCardClick, initializeGame}
}
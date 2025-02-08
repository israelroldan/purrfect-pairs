"use client"

import { useState, useEffect } from "react"
import { fetchCatImages } from "../utils/catApi"
import { catConfetti } from "../utils/catConfetti"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/legacy/image"

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

interface Card {
  imageUrl: string
  isFlipped: boolean
  isMatched: boolean
}

interface Player {
  name: string
  score: number
  matches: number
}

export default function CatMemoryGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPlayer, setCurrentPlayer] = useState<number>(0)
  const [players, setPlayers] = useState<Player[]>([
    { name: "Player 1", score: 0, matches: 0 },
    { name: "Player 2", score: 0, matches: 0 },
  ])
  const [gameCompleted, setGameCompleted] = useState<boolean>(false)
  const [winner, setWinner] = useState<number | null>(null)

  useEffect(() => {
    initializeGame()
  }, [])

  async function initializeGame() {
    setIsLoading(true)
    setPlayers([
      { name: "Player 1", score: 0, matches: 0 },
      { name: "Player 2", score: 0, matches: 0 },
    ])
    setCurrentPlayer(0)
    setGameCompleted(false)
    setWinner(null)
    const catImages = await fetchCatImages(10)
    const gameCards: Card[] = []

    for (let i = 0; i < 10; i++) {
      const card: Card = { imageUrl: catImages[i], isFlipped: false, isMatched: false }
      gameCards.push(card, { ...card })
    }

    setCards(gameCards.sort(() => Math.random() - 0.5))
    setIsLoading(false)
  }

  function handleCardClick(clickedCardIndex: number) {
    if (
      gameCompleted ||
      flippedCards.length === 2 ||
      cards[clickedCardIndex].isMatched ||
      cards[clickedCardIndex].isFlipped
    )
      return

    const newCards = [...cards]
    newCards[clickedCardIndex].isFlipped = true
    setCards(newCards)

    const newFlippedCards = [...flippedCards, clickedCardIndex]
    setFlippedCards(newFlippedCards)

    if (newFlippedCards.length === 2) {
      const [firstCardIndex, secondCardIndex] = newFlippedCards
      if (cards[firstCardIndex].imageUrl === cards[secondCardIndex].imageUrl) {
        // Match found
        newCards[firstCardIndex].isMatched = true
        newCards[secondCardIndex].isMatched = true
        setCards(newCards)

        const updatedPlayers = [...players]
        updatedPlayers[currentPlayer].score += 10
        updatedPlayers[currentPlayer].matches += 1
        setPlayers(updatedPlayers)

        setFlippedCards([])

        if (updatedPlayers[0].matches + updatedPlayers[1].matches === 10) {
          setGameCompleted(true)
          const winningPlayer =
            updatedPlayers[0].matches > updatedPlayers[1].matches
              ? 0
              : updatedPlayers[0].matches < updatedPlayers[1].matches
                ? 1
                : null
          setWinner(winningPlayer)
          setTimeout(() => catConfetti(), 500)
        }
      } else {
        // No match
        setTimeout(() => {
          newCards[firstCardIndex].isFlipped = false
          newCards[secondCardIndex].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
          setCurrentPlayer(1 - currentPlayer) // Switch player
        }, 1000)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl text-purple-600">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading cute kitties...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4">
      <motion.h1
        className="text-5xl font-bold mb-6 text-purple-800"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        Purrfect Pairs
      </motion.h1>
      <div className="flex justify-between w-full max-w-md mb-6">
        {players.map((player, index) => (
          <motion.div
            key={index}
            className={`text-center p-4 rounded-lg shadow-lg ${
              !gameCompleted && currentPlayer === index
                ? "bg-yellow-300"
                : gameCompleted && winner === index
                  ? "bg-green-300"
                  : "bg-white"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="font-bold text-xl mb-2">{player.name}</div>
            <div className="text-lg">Score: {player.score}</div>
            <div className="text-lg">Matches: {player.matches}</div>
            {!gameCompleted && currentPlayer === index && (
              <motion.div
                className="mt-2 text-sm font-semibold text-purple-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, repeatType: "reverse" }}
              >
                Your Turn!
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="grid grid-cols-5 gap-3 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCardClick(index)}
          >
            <div className="w-full h-full relative">
              <motion.div
                className={`absolute w-full h-full backface-hidden 
                  ${card.isFlipped || card.isMatched ? "hidden" : ""}
                  bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg 
                  flex items-center justify-center`}
                initial={false}
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-2xl">🐾</span>
              </motion.div>
              <motion.div
                className={`absolute w-full h-full backface-hidden 
                  ${card.isFlipped || card.isMatched ? "" : "hidden"}
                  ${card.isMatched ? "animate-celebrate" : ""}`}
                initial={false}
                animate={{ rotateY: card.isFlipped || card.isMatched ? 0 : -180 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={card.imageUrl || `${basePath}/placeholder.svg`}
                  alt="Cat"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  unoptimized={!card.imageUrl.startsWith("/")}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.button
        className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={initializeGame}
      >
        New Game
      </motion.button>
      <AnimatePresence>
        {gameCompleted && (
          <motion.div
            className="mt-6 text-3xl font-bold text-purple-800 bg-white bg-opacity-70 p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            {winner === null
              ? "It's a tie! Both players are purr-fect!"
              : `${players[winner].name} wins! That's paw-some!`}{" "}
            🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


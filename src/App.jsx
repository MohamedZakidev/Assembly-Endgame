import clsx from "clsx"
import { useState } from "react"
import { languages } from "./languages"

export default function AssemblyEndgame() {
  // eslint-disable-next-line no-unused-vars
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const WrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const hasWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const hasLost = WrongGuessCount >= languages.length

  const isGameOver = hasLost || hasWon

  // function getRandomWord() {
  //   const randomNumber = Math.floor(Math.random() * words.length)
  //   return words[randomNumber]
  // }

  function handleGuessLetter(letter) {
    setGuessedLetters(prev => [...prev, letter])
  }


  const languageElements = languages.map((lang, index) => {
    const lost = index < WrongGuessCount
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }
    return (
      <span
        className={`chip ${lost ? "lost" : ""}`}
        style={styles}
        key={lang.name}
      >
        {lang.name}
      </span>
    )
  })

  const letterElements = currentWord.split("").map((letter, index) => {
    const show = guessedLetters.includes(letter)
    return (
      <span key={index}>
        {show && (
          <span>
            {letter.toUpperCase()}
          </span>
        )}
      </span>
    )
  })

  const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const style = {
      backgroundColor: isCorrect ? "green" : isGuessed && "red"
    }
    return (
      <button
        key={letter}
        onClick={() => handleGuessLetter(letter)}
        disabled={isGuessed}
        style={style}
      >
        {letter.toUpperCase()}
      </button>
    )
  })


  const gameStatusClass = clsx("game-status", {
    won: hasWon,
    lost: hasLost
  })

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the
          programming world safe from Assembly!</p>
      </header>
      <section className={gameStatusClass}>
        {hasWon && (
          <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
          </>
        )}
        {hasLost && (
          <>
            <h2>Game over!</h2>
            <p>You lose! Better start learning Assembly 😭</p>
          </>
        )}

      </section>
      <section className="language-chips">
        {languageElements}
      </section>
      <section className="word">
        {letterElements}
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
      {
        isGameOver &&
        <button className="new-game">New Game</button>
      }
    </main>
  )
}

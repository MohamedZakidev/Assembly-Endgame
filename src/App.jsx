import clsx from "clsx"
import { useState } from "react"
import { languages } from "./languages"
import { getFarewellText } from "./utils"

export default function AssemblyEndgame() {
  // eslint-disable-next-line no-unused-vars
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])
  const [numGuessesLeft, setNumGuessesLeft] = useState(currentWord.length)

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const WrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

  const hasWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
  const hasLost = WrongGuessCount >= languages.length - 1
  const [hasGuessedWrong, setHasGuessedWrong] = useState(false)
  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]

  const isGameOver = hasLost || hasWon

  // function getRandomWord() {
  //   const randomNumber = Math.floor(Math.random() * words.length)
  //   return words[randomNumber]
  // }

  function handleGuessLetter(letter) {
    setGuessedLetters(prev => [...prev, letter])
    setHasGuessedWrong(!currentWord.includes(letter))
    setNumGuessesLeft(prev => prev - 1)
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
      backgroundColor: isCorrect ? "#10A95B" : isGuessed && "#EC5D49"
    }
    return (
      <button
        key={letter}
        onClick={() => handleGuessLetter(letter)}
        disabled={isGameOver || isGuessed}
        aria-disabled={isGameOver || isGuessed}
        aria-label={`letter ${letter}`}
        style={style}
      >
        {letter.toUpperCase()}
      </button>
    )
  })


  const gameStatusClass = clsx("game-status", {
    won: hasWon,
    lost: hasLost,
    farewell: !hasLost && hasGuessedWrong
  })

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the
          programming world safe from Assembly!</p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
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
        {!hasLost && hasGuessedWrong && (
          <>
            <p className="farewell-message">
              {getFarewellText(languages[WrongGuessCount - 1].name)}
            </p>
          </>
        )}
      </section>
      <section className="language-chips">
        {languageElements}
      </section>
      <section className="word">
        {letterElements}
      </section>

      <section aria-live="polite" role="status" className="sr-only">

        <p>
          {!hasGuessedWrong ?
            `Correct! The letter ${lastGuessedLetter} is in the word.` :
            `Sorry, the letter ${lastGuessedLetter} is not in the word.`
          }
          You have {numGuessesLeft} attempts left.
        </p>

        <p>
          {
            currentWord.split("").map(letter =>
              guessedLetters.includes(letter) ? letter + "." : "blank.")
              .join(" ")
          }
        </p>
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

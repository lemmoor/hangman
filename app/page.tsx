'use client';
import { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard';
import Word from './components/Word';
import GameOver from './components/GameOver';

export default function Home() {
  const [word, setWord] = useState('');
  const [previousLetters, setPreviousLetters] = useState('');
  //⬛ 🟩
  const [answerSequence, setAnswerSequence] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/getword');
      const data = await response.json();

      setWord(data.word);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (word.length + 5 - previousLetters.length <= 0) {
      setIsGameOver(true);
    }
  }, [previousLetters, word]);

  return (
    <main className='min-h-[calc(100vh-5rem)] flex flex-col justify-between items-center px-4 py-32 md:p-32'>
      <p className='text-center'>
        Guess today&apos;s word by selecting letters! You have {word.length + 5 - previousLetters.length} moves left.
      </p>
      {/* Generate lines and a word or whatever */}
      <Word word={word} previousLetters={previousLetters} />
      {/* Keyboard for input*/}
      <Keyboard setPreviousLetters={setPreviousLetters} previousLetters={previousLetters} word={word} />
      {isGameOver && <GameOver isWin={isWin} word={word} />}
    </main>
  );
}

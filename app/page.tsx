'use client';
import { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard';
import Word from './components/Word';
import GameOver from './components/GameOver';
import wordType from './types/word';

export default function Home() {
  const [detailedWord, setDetailedWord] = useState({ word: '' });
  const [previousLetters, setPreviousLetters] = useState('');
  //⬛ 🟩
  const [answerSequence, setAnswerSequence] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/getword');
      const data: wordType = await response.json();

      setDetailedWord(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (detailedWord.word.length + 5 - previousLetters.length <= 0) {
      setIsGameOver(true);
    }

    setAnswerSequence((prev) => {
      if (previousLetters.at(-1)) {
        if (detailedWord.word.toUpperCase().includes(previousLetters.at(-1) || 'N/A')) {
          return prev + '🟩';
        } else {
          return prev + '⬛';
        }
      }
      return prev;
    });
  }, [previousLetters, detailedWord.word]);

  return (
    <main className='min-h-[calc(100vh-5rem)] flex flex-col justify-between items-center px-4 py-32 md:p-32'>
      <p className='text-center'>
        Guess today&apos;s word by selecting letters! You have {detailedWord.word.length + 5 - previousLetters.length}{' '}
        moves left.
      </p>
      {/* Generate lines and a word or whatever */}
      <Word word={detailedWord.word} previousLetters={previousLetters} />
      {/* Keyboard for input*/}
      <Keyboard setPreviousLetters={setPreviousLetters} previousLetters={previousLetters} word={detailedWord.word} />
      {isGameOver && <GameOver isWin={isWin} detailedWord={detailedWord as wordType} answerSequence={answerSequence} />}
    </main>
  );
}

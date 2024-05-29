'use client';
import { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard';
import Word from './components/Word';
import GameOver from './components/GameOver';
import wordType from './types/word';

export default function Home() {
  const maxWrongGuesses = 5;
  const [detailedWord, setDetailedWord] = useState({ word: '' });
  const [previousLetters, setPreviousLetters] = useState('');
  const [answerSequence, setAnswerSequence] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState(0);

  useEffect(() => {
    //check local storage if user played today already
    if (localStorage.getItem('hangman')) {
      type storedType = {
        isWin: boolean;
        date: string;
        detailedWord: wordType;
        answerSequence: string;
      };

      let stored: storedType = JSON.parse(localStorage.getItem('hangman') as string);

      if (new Date().toDateString() == stored.date) {
        //game already played today
        setDetailedWord(stored.detailedWord);
        setIsWin(stored.isWin);
        setAnswerSequence(stored.answerSequence);
        setIsGameOver(true);
      } else {
        //game not played today, stored game expired
        localStorage.removeItem('hangman');
        fetchData();
      }
    } else {
      fetchData();
    }

    async function fetchData() {
      try {
        const response = await fetch('/api/getword');
        const data: wordType = await response.json();
        setDetailedWord(data);
      } catch (error) {
        console.error('Failed to fetch word:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (detailedWord.word.length + maxWrongGuesses - previousLetters.length <= 0) {
      //user lost
      setIsGameOver(true);
    }

    if (previousLetters.at(-1)) {
      if (detailedWord.word.toUpperCase().includes(previousLetters.at(-1) || 'N/A')) {
        setAnswerSequence((prev) => prev + '🟩');
        setCorrectGuesses((prev) => prev + 1);
      } else {
        setAnswerSequence((prev) => prev + '⬛');
      }
    }
  }, [previousLetters, detailedWord.word]);

  useEffect(() => {
    if (correctGuesses != 0 && correctGuesses == new Set(detailedWord.word.split('')).size) {
      setIsWin(true);
      setIsGameOver(true);
    }
  }, [correctGuesses, detailedWord.word]);

  return (
    <main className='min-h-[calc(100vh-5rem)] flex flex-col justify-between items-center px-4 py-32 md:p-32'>
      <p className='text-center'>
        Guess today&apos;s word by selecting letters! You have{' '}
        {detailedWord.word.length + maxWrongGuesses - previousLetters.length} moves left.
      </p>
      {/* Generate lines and a word or whatever */}
      <Word word={detailedWord.word} previousLetters={previousLetters} />
      {/* Keyboard for input*/}
      <Keyboard setPreviousLetters={setPreviousLetters} previousLetters={previousLetters} word={detailedWord.word} />
      {isGameOver && <GameOver isWin={isWin} detailedWord={detailedWord as wordType} answerSequence={answerSequence} />}
    </main>
  );
}

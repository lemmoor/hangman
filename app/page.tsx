'use client';
import { useState } from 'react';
import Keyboard from './components/Keyboard';
import Word from './components/Word';

export default function Home() {
  //test word
  const word = 'Ineffable';
  const [previousLetters, setPreviousLetters] = useState('');

  return (
    <main className='min-h-screen flex flex-col justify-between items-center pb-32'>
      <div className='border-b-2 border-b-black h-20 w-full flex items-center justify-center text-3xl'>Hangman</div>
      {/* Generate lines and a word or whatever */}
      <Word word={word} previousLetters={previousLetters} />
      {/* Keyboard for input*/}
      <Keyboard setPreviousLetters={setPreviousLetters} previousLetters={previousLetters} word={word} />
    </main>
  );
}

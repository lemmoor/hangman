import { useState } from 'react';

import wordType from '../types/word';

interface GameOverProps {
  isWin: boolean;
  detailedWord: wordType;
  answerSequence: string;
}

export default function GameOver({ isWin, detailedWord, answerSequence }: GameOverProps) {
  const [buttonText, setButtonText] = useState('Share');

  const handleShare = () => {
    const today = new Date();
    navigator.clipboard
      .writeText(`Hangman ${today.toDateString()} X/${detailedWord.word.length + 5} \n${answerSequence}`)
      .then(() => {
        setButtonText('Copied to clipboard!');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
        setButtonText('Could not copy to clipboard :(');
      });

    setTimeout(() => {
      setButtonText('Share');
    }, 1000);
  };

  return (
    <div className='absolute top-0 bg-slate-100 w-full min-h-screen p-8 md:p-16 text-xl text-center'>
      <p className='text-4xl pb-8'>Game over</p>
      <p className='font-bold text-2xl my-2'>
        {detailedWord.word}{' '}
        <span className='cursor-pointer' onClick={() => new Audio(detailedWord.audio).play()}>
          🔊
        </span>
      </p>
      {/* TODO: definitions or something */}
      <p className='italic mb-4'>{detailedWord.phonetic} </p>
      <ul className='text-left w-fit mx-auto'>
        {detailedWord.meanings.map((meaning, i) => (
          <li key={i} className='list-disc my-1'>
            {meaning}
          </li>
        ))}
      </ul>
      <div
        onClick={handleShare}
        className='mt-16 mx-auto bg-gray-600 text-white rounded-lg w-fit px-8 py-4 hover:bg-gray-500 hover:cursor-pointer'
      >
        {buttonText}
      </div>
    </div>
  );
}

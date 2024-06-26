import { useEffect, useState } from 'react';

import wordType from '../types/word';

interface GameOverProps {
  isWin: boolean;
  detailedWord: wordType;
  answerSequence: string;
}

export default function GameOver({ isWin, detailedWord, answerSequence }: GameOverProps) {
  const [buttonText, setButtonText] = useState('Share');

  useEffect(() => {
    //record to local storage
    let date = new Date().toDateString();
    localStorage.setItem('hangman', JSON.stringify({ date, isWin, detailedWord, answerSequence }));
  });

  const handleShare = () => {
    const today = new Date();
    let moves = isWin ? Array.from(answerSequence).length : 'X';
    navigator.clipboard
      .writeText(
        `I played Hangman on ${today.toDateString()}, moves: ${moves}/${
          detailedWord.word.length + 5
        } \n${answerSequence}\n\nhttps://hangman-english.vercel.app/`
      )
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
    <div className='absolute top-0 bg-gradient-brown w-full min-h-screen p-8 md:p-16 text-xl text-center'>
      <p className='text-4xl mb-2'>{isWin ? 'You Won!' : 'Game over'}</p>
      <p className='text-sm mb-8'>Come back tomorrow for another game</p>
      <p className='font-bold text-2xl my-2'>
        {detailedWord.word}{' '}
        <span className='cursor-pointer' onClick={() => new Audio(detailedWord.audio).play()}>
          🔊
        </span>
      </p>
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
        className='mt-16 mx-auto bg-deep-red text-white rounded-lg w-fit px-8 py-4 hover:bg-[#754846] hover:cursor-pointer transition-colors'
      >
        {buttonText}
      </div>
    </div>
  );
}

import { useState } from 'react';

interface GameOverProps {
  isWin: boolean;
  word: string;
}

export default function GameOver({ isWin, word }: GameOverProps) {
  const [buttonText, setButtonText] = useState('Share');

  const handleShare = () => {
    setButtonText('(not) Copied to clipboard!');
    setTimeout(() => {
      setButtonText('Share');
    }, 1000);
  };

  return (
    <div className='absolute top-0 bg-slate-100 w-full min-h-screen p-8 md:p-16 text-xl text-center'>
      <p className='text-4xl pb-8'>Game over</p>
      <p className='font-bold text-2xl py-4'>{word}</p>
      {/* TODO: definitions or something */}
      <p className='italic'>*Insert definition here*</p>
      <div
        onClick={handleShare}
        className='mt-16 mx-auto bg-gray-600 text-white rounded-lg w-fit px-8 py-4 hover:bg-gray-500 hover:cursor-pointer'
      >
        {buttonText}
      </div>
    </div>
  );
}

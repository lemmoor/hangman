interface WordProps {
  word: string;
  previousLetters: string;
}

export default function Word({ word, previousLetters }: WordProps) {
  return (
    <div className='w-full p-16 font-mono font-black text-3xl lg:text-8xl text-center'>
      {word.split('').map((letter, i) => {
        if (previousLetters.includes(letter.toUpperCase())) {
          return `${letter} `;
        } else {
          return '_ ';
        }
      })}
    </div>
  );
}

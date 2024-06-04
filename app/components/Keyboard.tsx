interface KeyboardProps {
  setPreviousLetters: React.Dispatch<React.SetStateAction<string>>;
  previousLetters: string;
  word: string;
}

export default function Keyboard({ setPreviousLetters, previousLetters, word }: KeyboardProps) {
  const qwertyLayout: string[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];
  return (
    <div className='w-min flex flex-col '>
      {qwertyLayout.map((line, i) => (
        <div key={i} className='flex mx-auto w-min'>
          {line.map((letter, j) => {
            const letterCorrect = word.toUpperCase().includes(letter) && previousLetters.includes(letter);
            const letterIncorrect = !word.toUpperCase().includes(letter) && previousLetters.includes(letter);
            return (
              <div
                key={i * 100 + j + 1}
                className={`font-mono text-lg sm:text-xl 
                            ${letterCorrect && 'bg-green-900'} 
                            ${letterIncorrect && 'bg-gray-500'}
                            ${!previousLetters.includes(letter) && 'bg-deep-red'}
                            rounded-md p-2 sm:p-3 m-[0.15rem] sm:m-1  text-white cursor-pointer transition-colors`}
                onClick={() => {
                  if (!previousLetters.includes(letter)) {
                    setPreviousLetters((prev: string) => (prev += letter));
                  }
                }}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

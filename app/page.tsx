//temp solution
'use client';

export default function Home() {
  const qwertyLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  return (
    <main className='min-h-screen flex flex-col justify-between items-center pb-32'>
      <div className='border-b-2 border-b-black h-20 w-full flex items-center justify-center text-3xl'>Hangman</div>
      {/* Generate lines and a word or whatever */}
      <div className='w-full p-24 font-mono font-black text-[10rem] text-center'>
        _ _ _ _ _ ? <br /> <p className='text-sm'>(add stuff later)</p>
      </div>
      {/* Keyboard for input*/}
      <div className='w-min flex flex-col '>
        {qwertyLayout.map((line, i) => (
          <div key={i} className='flex mx-auto w-min'>
            {line.map((letter, j) => (
              <div
                key={i * 100 + j + 1}
                className='font-mono text-xl bg-gray-600 rounded-md p-3 m-1 text-white cursor-pointer hover:bg-gray-500 transition-colors'
                onClick={() => console.log(letter)}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

import { NextResponse } from 'next/server';
import wordlistJson from './wordlist.json';
import wordType from '@/app/types/word';

const wordlist = wordlistJson as wordType[];

export async function GET() {
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const diff = Number(today) - Number(start);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayNumber = Math.floor(diff / oneDay); // get today's day number

  // If dayNumber is greater than the length of the wordlist, wrap around
  const index = dayNumber > wordlist.length ? dayNumber % wordlist.length : dayNumber;

  const word = wordlist[index - 1];

  return NextResponse.json(word);
}

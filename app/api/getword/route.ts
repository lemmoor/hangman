import { NextResponse } from 'next/server';
import wordlistJson from './wordlist.json';

type wordlistType = string[];
const wordlist = wordlistJson as wordlistType;

export async function GET() {
  const randomWord = wordlist[Math.floor(Math.random() * wordlist.length)];

  return NextResponse.json({ word: randomWord });
}

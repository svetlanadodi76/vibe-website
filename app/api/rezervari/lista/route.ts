import { NextResponse } from 'next/server';
import { citesteRezervari } from '@/lib/actions/rezervari';

export async function GET() {
  const rezultat = await citesteRezervari();
  return NextResponse.json(rezultat);
}

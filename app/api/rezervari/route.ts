import { NextRequest, NextResponse } from 'next/server';
import { salveazaRezervare } from '@/lib/actions/rezervari';
import { supabase } from '@/lib/supabase';

type Status = 'în așteptare' | 'confirmat' | 'respins';
const STATUSURI_VALIDE: Status[] = ['în așteptare', 'confirmat', 'respins'];

// POST — salvează rezervare nouă
export async function POST(req: NextRequest) {
  const date = await req.json();
  const rezultat = await salveazaRezervare(date);

  if (!rezultat.succes) {
    return NextResponse.json(rezultat, { status: 500 });
  }

  return NextResponse.json(rezultat, { status: 200 });
}

// PATCH — schimbă statusul unei rezervări
// Body: { id: number, status: 'în așteptare' | 'confirmat' | 'respins' }
export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();

  if (!id || !STATUSURI_VALIDE.includes(status)) {
    return NextResponse.json({ succes: false, mesaj: 'ID sau status invalid.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('rezervari')
    .update({ status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ succes: false, mesaj: 'Nu s-a putut actualiza statusul.' }, { status: 500 });
  }

  return NextResponse.json({ succes: true, mesaj: `Status actualizat: ${status}` });
}

// DELETE — șterge o rezervare după ID
// Body: { id: number }
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ succes: false, mesaj: 'ID lipsă.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('rezervari')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ succes: false, mesaj: 'Nu s-a putut șterge rezervarea.' }, { status: 500 });
  }

  return NextResponse.json({ succes: true, mesaj: 'Rezervare ștearsă.' });
}

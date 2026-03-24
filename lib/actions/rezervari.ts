'use server';

import { supabase } from '@/lib/supabase';

export type RezervareData = {
  nume: string;
  email: string;
  telefon: string;
  numar_persoane: number;
  data: string;
  ora: string;
};

export async function salveazaRezervare(date: RezervareData) {
  const { error } = await supabase.from('rezervari').insert([date]);

  if (error) {
    return { succes: false, mesaj: 'A apărut o eroare. Încearcă din nou.' };
  }

  return { succes: true, mesaj: 'Rezervare trimisă cu succes!' };
}

export async function citesteRezervari() {
  const { data, error } = await supabase
    .from('rezervari')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { succes: false, date: [], mesaj: 'Nu s-au putut încărca rezervările.' };
  }

  return { succes: true, date: data, mesaj: '' };
}

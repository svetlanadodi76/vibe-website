import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const data = req.nextUrl.searchParams.get('data');

  if (!data) {
    return NextResponse.json({ ore: [] });
  }

  const { data: rezervari, error } = await supabase
    .from('rezervari')
    .select('ora')
    .eq('data', data)
    .neq('status', 'respins');

  if (error) {
    return NextResponse.json({ ore: [] }, { status: 500 });
  }

  const ore = rezervari.map((r) => r.ora.substring(0, 5));

  return NextResponse.json({ ore });
}

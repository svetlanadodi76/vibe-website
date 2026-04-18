import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { KNOWLEDGE_BASE } from '@/lib/knowledge-base';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

type Mesaj = { rol: 'user' | 'assistant'; text: string };

export async function POST(req: NextRequest) {
  const { mesaje }: { mesaje: Mesaj[] } = await req.json();

  // Păstrează ultimele 6 mesaje ca context (fără mesajul curent)
  const context = mesaje.slice(-7, -1).slice(-6);

  const istoricFormatat = context.map((m) => ({
    role: m.rol === 'user' ? ('user' as const) : ('assistant' as const),
    content: m.text,
  }));

  const ultimulMesaj = mesaje[mesaje.length - 1];

  const response = await client.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 200,
    system: KNOWLEDGE_BASE,
    messages: [
      ...istoricFormatat,
      { role: 'user', content: ultimulMesaj.text },
    ],
  });

  const raspuns =
    response.content[0].type === 'text'
      ? response.content[0].text
      : 'Scuze, nu am putut răspunde.';

  return NextResponse.json({ raspuns });
}

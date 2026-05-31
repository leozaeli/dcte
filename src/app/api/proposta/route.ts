import { put, list } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { slug, data } = await req.json();

  if (!slug || !data) {
    return NextResponse.json({ error: 'slug e data são obrigatórios' }, { status: 400 });
  }

  const blob = await put(`proposals/${slug}.json`, JSON.stringify(data), {
    access: 'public',
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 30, // 30 dias
  });

  return NextResponse.json({ url: blob.url });
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'slug obrigatório' }, { status: 400 });
  }

  try {
    const { blobs } = await list({ prefix: `proposals/${slug}.json`, limit: 1 });
    if (!blobs.length) return NextResponse.json({ error: 'Proposta não encontrada' }, { status: 404 });
    const res = await fetch(blobs[0].url);
    const data = await res.json();
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Proposta não encontrada' }, { status: 404 });
  }
}

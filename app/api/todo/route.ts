import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body;
    const newTodo = await prisma.todo.create({
      data: {
        title: title ?? 'Nové todo',
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Chyba při vytváření todo:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

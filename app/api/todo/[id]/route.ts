/*
  API endoints are no longer used!
  Instead I switched to server functions.
*/

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type ParamsProps = {
  params: {
    id: string;
  };
};

export async function PATCH(request: NextRequest, { params }: ParamsProps) {
  try {
    const { id } = params;
    const body: Prisma.TodoUpdateInput = await request.json();
    const { isCompleted, notes, priority, title } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID missing' }, { status: 400 });
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        notes,
        priority,
        title,
        isCompleted,
        updatedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.error(`Chyba při updatu todo: ${error}`);

    return NextResponse.json(
      { error: 'Nepodařilo se aktualizovat todo' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'ID chybí' }, { status: 400 });
    }

    await prisma.todo.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Todo úspěšně smazáno' });
  } catch (error) {
    console.error(`Chyba při mazání todo:`, error);

    return NextResponse.json(
      { error: 'Nepodařilo se smazat todo' },
      { status: 500 },
    );
  }
}

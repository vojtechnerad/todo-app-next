'use server';

import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type TodoUpdate = Prisma.TodoUpdateInput;

export async function addTodo() {
  const newTodo = await prisma.todo.create({
    data: {
      title: 'Nové todo',
      isCompleted: false,
      priority: 3,
    },
  });

  revalidatePath('/');
  redirect(`/${newTodo.id}`);
}

export async function addTodoWithResult() {
  const newTodo = await prisma.todo.create({
    data: {
      title: 'Nové todo',
      isCompleted: false,
      priority: 3,
    },
  });

  revalidatePath('/');

  return newTodo;
}

export async function deleteTodo(id: string) {
  await prisma.todo.delete({
    where: { id },
  });

  revalidatePath('/');
}

export async function updateTodo(id: string, payload: TodoUpdate) {
  await prisma.todo.update({
    where: { id },
    data: {
      notes: payload.notes,
      priority: payload.priority,
      title: payload.title,
      isCompleted: payload.isCompleted,
      updatedAt: new Date().toISOString(),
    },
  });

  revalidatePath(`/`);
}

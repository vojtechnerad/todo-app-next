import { prisma } from '@/lib/prisma';
import TodoListClient from './todo-list-client';
import { TodoFilterProvider } from '../context';

export default async function TodoList() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <TodoFilterProvider>
      <TodoListClient todos={todos} />
    </TodoFilterProvider>
  );
}

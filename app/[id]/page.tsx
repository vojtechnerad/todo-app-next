import { prisma } from '@/lib/prisma';
import { TodoDetailClient } from './components/todo-detail-client';

type Props = {
  params: { id: string };
};
export default async function TodoDetail({ params }: Props) {
  const { id } = await params;

  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    return <div>Todo nenalezeno</div>;
  }

  return <TodoDetailClient todo={todo} />;
}

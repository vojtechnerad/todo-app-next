import { prisma } from '@/lib/prisma';
import { TodoDetailClient } from './components/todo-detail-client';

type Props = {
  params: { id: string };
};
export default async function TodoDetail({ params }: Props) {
  // TODOvner dělá problémy, chce await
  const id = params.id;

  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    return <div>Todo nenalezeno</div>;
  }

  return <TodoDetailClient todo={todo} />;
}

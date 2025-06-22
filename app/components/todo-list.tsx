import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { prisma } from '@/lib/prisma';
import { priorityToText, priorityToVarinat } from '@/utils/todoUtils';
import { CheckIcon, XIcon } from 'lucide-react';
import Link from 'next/link';

export default async function TodoList() {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <ScrollArea className="h-full pr-2">
      {todos.map((todo) => {
        return (
          <Link key={todo.id} href={`/${todo.id}`}>
            <Card className="mb-2">
              <CardHeader>
                <CardTitle>{todo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1">
                  {/* Is Completed */}
                  {todo.isCompleted ? (
                    <CheckIcon className="bg-green-700 rounded-full w-5 h-5 p-0.5" />
                  ) : (
                    <XIcon className="bg-destructive/60 rounded-full w-5 h-5 p-0.5" />
                  )}

                  {/* Priority */}
                  <Badge variant={priorityToVarinat(todo.priority)}>
                    {priorityToText(todo.priority)}
                  </Badge>
                </div>
                {/* <Button></Button> */}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </ScrollArea>
  );
}

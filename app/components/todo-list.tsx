'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

export default function TodoList() {
  const router = useRouter();
  type Todo = {
    title: string;
    id: string;
    isCompleted: boolean;
  };
  const todosMock: Array<Todo> = [
    { isCompleted: false, title: 'Test', id: '1' },
    { isCompleted: true, title: 'Test2', id: '2' },
  ];

  return (
    <ScrollArea>
      {todosMock.map((todo) => {
        return (
          <Card key={todo.id} onClick={() => router.push(`/${todo.id}`)}>
            <CardHeader>
              <CardTitle>{todo.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {todo.isCompleted ? (
                <Badge variant="success">xd</Badge>
              ) : (
                <Badge variant="destructive">xd</Badge>
              )}
            </CardContent>
          </Card>
        );
      })}
    </ScrollArea>
  );
}

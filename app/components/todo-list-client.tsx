'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { priorityToText, priorityToVarinat } from '@/utils/todoUtils';
import TodoToolbar from './todo-toolbar';
import { Todo } from '@prisma/client';
import { useTodoFilter } from '../context';
type Props = {
  todos: Array<Todo>;
};
export default function TodoListClient({ todos }: Props) {
  const { query: filter, status } = useTodoFilter();

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesTitle = todo.title
        .toLowerCase()
        .includes(filter.toLowerCase());
      console.log(status);
      const matchesStatus = () => {
        console.log(status);
        if (status === 'completed') return todo.isCompleted === true;
        if (status === 'pending') return todo.isCompleted === false;
        return true;
      };

      return matchesTitle && matchesStatus();
    });
  }, [filter, status, todos]);

  return (
    <>
      {status}
      <TodoToolbar />
      <div className="flex-grow overflow-auto">
        <ScrollArea className="h-full pr-2">
          {filteredTodos.map((todo) => (
            <Link key={todo.id} href={`/${todo.id}`}>
              <Card className="mb-2">
                <CardHeader>
                  <CardTitle>{todo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1">
                    {todo.isCompleted ? (
                      <CheckIcon className="bg-green-700 rounded-full w-5 h-5 p-0.5" />
                    ) : (
                      <XIcon className="bg-destructive/60 rounded-full w-5 h-5 p-0.5" />
                    )}
                    <Badge variant={priorityToVarinat(todo.priority)}>
                      {priorityToText(todo.priority)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </ScrollArea>
      </div>
    </>
  );
}

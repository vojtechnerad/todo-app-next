'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { priorityToText, priorityToVarinat } from '@/utils/todoUtils';
import { Todo } from '@prisma/client';
import { CheckIcon, XIcon } from 'lucide-react';
import { useParams } from 'next/navigation';

type Props = {
  todo: Todo;
};

export default function TodoCard({ todo }: Props) {
  const params = useParams();
  const selectedTodoId = params.id;

  const selectedTodoClass = selectedTodoId === todo.id ? 'border-white' : '';

  return (
    <Card className={`mb-2 ${selectedTodoClass}`}>
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
  );
}

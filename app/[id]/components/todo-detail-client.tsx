'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { priorityToText, priorityToVarinat } from '@/utils/todoUtils';
import { Prisma, Todo } from '@prisma/client';
import { Edit2, FilePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  todo: Todo;
};

type TodoUpdate = Prisma.TodoUpdateInput;

export function TodoDetailClient({ todo }: Props) {
  const router = useRouter();

  const defaultNotes = todo.notes ?? '';

  const [title, setTitle] = useState(todo.title);
  const [notes, setNotes] = useState(defaultNotes);
  const [priority, setPriority] = useState(String(todo.priority));
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  const isTitleChanged = todo.title !== title;
  const isNotesChanged = defaultNotes !== notes;
  const isPriorityChanged = String(todo.priority) !== priority;
  const isCompletedChanged = todo.isCompleted !== isCompleted;

  const isDirty = [
    isTitleChanged,
    isNotesChanged,
    isPriorityChanged,
    isCompletedChanged,
  ].some((item) => item);

  const handleUpdateTodo = async () => {
    const payload: TodoUpdate = {
      title,
      isCompleted,
      notes: notes ?? null,
      priority: Number(priority),
    };
    await fetch(`/api/todo/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

    // Refresh sever komponent
    router.refresh();
  };

  const handleDeleteTodo = async () => {
    await fetch(`/api/todo/${todo.id}`, {
      method: 'DELETE',
    });

    // Refresh sever komponent
    router.refresh(); // TODOvner nefunguje refresh a pak push, provede se jen push

    // Redirect na homepage
    router.push('/');
  };

  return (
    <div>
      {/* Title input */}
      <Input
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      ></Input>

      {/* Notes textarea */}
      <Textarea
        defaultValue={todo.notes ?? ''}
        placeholder="Napiš popis ke svému todo"
        className="mb-2"
        onChange={(e) => setNotes(e.target.value)}
      />

      {/* Completed status switch */}
      <div className="flex items-center gap-2 mb-2">
        <span>Status</span>
        <Switch defaultChecked={isCompleted} onCheckedChange={setIsCompleted} />
        <p>{isCompleted ? 'Splněno' : 'Nesplněno'}</p>
      </div>

      {/* Priority selection */}
      <div className="mb-2">
        <Select
          defaultValue={String(todo.priority)}
          onValueChange={setPriority}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            {[5, 4, 3, 2, 1].map((priority) => {
              return (
                <SelectItem key={priority} value={String(priority)}>
                  <Badge variant={priorityToVarinat(priority)}>
                    {priorityToText(priority)}
                  </Badge>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Dates */}
      <div className="mb-2">
        {/* CreatedAt */}
        <div className="flex items-center gap-2">
          <FilePlus className="w-4 h4" />
          <span>{todo.createdAt.toLocaleString()}</span>
        </div>

        {/* UpdatedAt */}
        {todo.updatedAt && (
          <div className="flex items-center gap-2">
            <Edit2 width={16} />
            <span>{todo.updatedAt.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-1">
        <Button onClick={handleUpdateTodo} disabled={!isDirty}>
          Uložit
        </Button>
        <Button variant={'destructive'} onClick={handleDeleteTodo}>
          Smazat
        </Button>
      </div>
    </div>
  );
}

'use client';

import { deleteTodo, updateTodo } from '@/app/actions/todo';
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
import Spinner from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { priorityToText, priorityToVarinat } from '@/utils/todoUtils';
import { Prisma, Todo } from '@prisma/client';
import { Edit2, FilePlus, Save, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

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

  const [isUpdatePending, startUpdateTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

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

    startUpdateTransition(() => updateTodo(todo.id, payload));
  };

  const handleDeleteTodo = async () => {
    startDeleteTransition(() => deleteTodo(todo.id));
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className="px-2">
      {/* Title input */}
      <Input
        defaultValue={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Zadej název todo..."
        className="mb-2"
      ></Input>

      {/* Notes textarea */}
      <Textarea
        defaultValue={todo.notes ?? ''}
        placeholder="Napiš popis ke svému todo..."
        className="mb-2"
        onChange={(e) => setNotes(e.target.value)}
      />

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

      {/* Completed status switch */}
      <div className="flex items-center gap-2 mb-2">
        <span>Status</span>
        <Switch defaultChecked={isCompleted} onCheckedChange={setIsCompleted} />
        <p>{isCompleted ? 'Splněno' : 'Nesplněno'}</p>
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
        {/* Save */}
        <Button
          onClick={handleUpdateTodo}
          disabled={!isDirty || isUpdatePending}
        >
          {isUpdatePending ? <Spinner /> : <Save />}
          Uložit
        </Button>

        {/* Delete */}
        <Button
          variant={'destructive'}
          onClick={handleDeleteTodo}
          disabled={isDeletePending}
        >
          {isDeletePending ? <Spinner /> : <Trash2 />}
          Smazat
        </Button>

        {/* Cancel */}
        <Button variant="ghost" onClick={handleCancel}>
          <X /> Zrušit
        </Button>
      </div>
    </div>
  );
}

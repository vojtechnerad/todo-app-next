'use client';

import { useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import TodoToolbar from './todo-toolbar';
import { Todo } from '@prisma/client';
import { useTodoFilter } from '../context';
import TodoCard from './todo-card';
import { CircleAlert } from 'lucide-react';

type Props = {
  todos: Array<Todo>;
};

export default function TodoListClient({ todos }: Props) {
  const {
    query: filter,
    status,
    priorities,
    isAnyFilterUsed,
  } = useTodoFilter();

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesTitle = todo.title
        .toLowerCase()
        .includes(filter.toLowerCase());

      const matchesStatus = () => {
        if (status === 'completed') return todo.isCompleted === true;
        if (status === 'pending') return todo.isCompleted === false;
        return true;
      };

      const matchesPriority = () => {
        // Skip if no priorities are selected
        if (priorities.length == 0) return true;

        return priorities.some(
          (priority) => String(todo.priority) === priority,
        );
      };

      return matchesTitle && matchesStatus() && matchesPriority();
    });
  }, [filter, status, priorities, todos]);

  const shownTodosText = () => {
    return `Celkem ${filteredTodos.length}${
      isAnyFilterUsed ? ` (z ${todos.length})` : ''
    } todos`;
  };

  return (
    <>
      <TodoToolbar />

      <span className="text-xs p-2 text-end">{shownTodosText()}</span>

      <div className="flex-grow overflow-auto">
        <ScrollArea className="h-full pr-2">
          {filteredTodos.map((todo) => (
            <Link key={todo.id} href={`/${todo.id}`}>
              <TodoCard todo={todo} />
            </Link>
          ))}
          {filteredTodos.length === 0 && (
            <div className="bg-card text-card-foreground flex row gap-2 rounded-xl border p-2 shadow-sm items-center">
              <CircleAlert className="text-yellow-500 w-5 h-5" /> Žádná todo
              nenalezena
            </div>
          )}
        </ScrollArea>
      </div>
    </>
  );
}

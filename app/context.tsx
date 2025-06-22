'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type StatusFilter = 'all' | 'completed' | 'pending';

type TodoFilterContextType = {
  query: string;
  setQuery: (value: string) => void;
  status: StatusFilter;
  setStatus: (value: StatusFilter) => void;
};

const TodoFilterContext = createContext<TodoFilterContextType | undefined>(
  undefined,
);

export function TodoFilterProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  return (
    <TodoFilterContext.Provider value={{ query, setQuery, status, setStatus }}>
      {children}
    </TodoFilterContext.Provider>
  );
}

export function useTodoFilter() {
  const context = useContext(TodoFilterContext);
  if (!context)
    throw new Error('useTodoFilter must be used within TodoFilterProvider');
  return context;
}

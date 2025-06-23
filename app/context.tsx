'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type StatusFilter = 'all' | 'completed' | 'pending';
type PriorityQuery = Array<string>;

type TodoFilterContextType = {
  query: string;
  setQuery: (value: string) => void;
  status: StatusFilter;
  setStatus: (value: StatusFilter) => void;
  priorities: PriorityQuery;
  setPriorities: (value: PriorityQuery) => void;
  isAnyFilterUsed: boolean;
  unsetFilters: () => void;
};

const TodoFilterContext = createContext<TodoFilterContextType | undefined>(
  undefined,
);

export function TodoFilterProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [priorities, setPriorities] = useState<PriorityQuery>([]);
  const isAnyFilterUsed = !!query || status !== 'all' || priorities.length > 0;
  const unsetFilters = () => {
    setQuery('');
    setStatus('all');
    setPriorities([]);
  };

  return (
    <TodoFilterContext.Provider
      value={{
        query,
        setQuery,
        status,
        setStatus,
        priorities,
        setPriorities,
        isAnyFilterUsed,
        unsetFilters,
      }}
    >
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

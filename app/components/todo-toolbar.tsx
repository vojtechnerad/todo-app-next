'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronsUpDown, Filter, FilterX, Plus, Search, X } from 'lucide-react';
import { StatusFilter, useTodoFilter } from '../context';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { useState, useTransition } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { priorityToVarinat } from '@/utils/todoUtils';
import { Badge } from '@/components/ui/badge';
import { addTodoWithResult } from '../actions/todo';
import Spinner from '@/components/ui/spinner';
import { useRouter } from 'next/navigation';

export default function TodoToolbar() {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddPending, startAddTransition] = useTransition();
  const {
    query,
    setQuery,
    status,
    setStatus,
    priorities,
    setPriorities,
    isAnyFilterUsed,
    unsetFilters,
  } = useTodoFilter();

  const handleSetStatus = (val: string) => {
    if (val === '') {
      setStatus('all');
    } else {
      setStatus(val as StatusFilter);
    }
  };

  const handleAddTodo = async () => {
    startAddTransition(async () => {
      const todo = await addTodoWithResult();
      router.push(`${todo.id}`);
    });
  };

  return (
    <div className="pr-2 pb-2">
      <div className="flex justify-between">
        <div>
          <Button onClick={handleAddTodo} disabled={isAddPending}>
            {isAddPending ? <Spinner /> : <Plus />}
            Přidat
          </Button>
        </div>
        <Toggle pressed={isFilterOpen} onPressedChange={setIsFilterOpen}>
          <ChevronsUpDown />
        </Toggle>
      </div>
      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <CollapsibleContent className="p-2">
          {/* Searchbar */}
          <div className="relative w-full max-w-sm pb-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />

            <Input
              type="text"
              placeholder="Hledat úkoly..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {/* Clear button, only if query is set */}
            {query && (
              <button
                onClick={() => setQuery('')}
                className={cn(
                  'absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground',
                  'transition-colors',
                )}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Priorities filter */}
          <ToggleGroup
            type="multiple"
            value={priorities}
            onValueChange={setPriorities}
            aria-label="Filtrace podle priority"
            className="pb-2"
          >
            Priorita
            {[5, 4, 3, 2, 1].map((priority) => {
              return (
                <ToggleGroupItem key={priority} value={String(priority)}>
                  <Badge variant={priorityToVarinat(priority)}>
                    {priority}
                  </Badge>
                </ToggleGroupItem>
              );
            })}
          </ToggleGroup>

          {/* Status filter */}
          <ToggleGroup
            type="single"
            value={status}
            onValueChange={handleSetStatus}
            aria-label="Filtrace podle stavu"
            className="pb-2"
          >
            Status
            <ToggleGroupItem value="completed" aria-label="Hotové">
              Splněno
            </ToggleGroupItem>
            <ToggleGroupItem value="pending" aria-label="Nehotové">
              Nesplněno
            </ToggleGroupItem>
          </ToggleGroup>

          {/* Turn off all filters button */}
          <Button
            variant="ghost"
            onClick={unsetFilters}
            className="w-full"
            disabled={!isAnyFilterUsed}
          >
            <span className="flex items-center gap-2">
              {isAnyFilterUsed ? (
                <>
                  <FilterX />
                  <span>Vymazat filtry</span>
                </>
              ) : (
                <>
                  <Filter />
                  <span>Filtry neaktivní</span>
                </>
              )}
            </span>
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

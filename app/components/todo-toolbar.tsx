'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterX, Plus, Search } from 'lucide-react';
import { StatusFilter, useTodoFilter } from '../context';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function TodoToolbar() {
  const { query, setQuery, status, setStatus } = useTodoFilter();

  const handleSetStatus = (val: string) => {
    if (val === '') {
      setStatus('all');
    } else {
      setStatus(val as StatusFilter);
    }
  };

  return (
    <div className="pr-2 pb-2">
      {status}
      <Button>
        <Plus />
        Přidat
      </Button>
      <FilterX />
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
        <Input
          type="text"
          placeholder="Hledat úkoly..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <ToggleGroup
        type="single"
        value={status}
        onValueChange={handleSetStatus}
        aria-label="Filtrace podle stavu"
      >
        Status
        <ToggleGroupItem value="completed" aria-label="Hotové">
          Splněno
        </ToggleGroupItem>
        <ToggleGroupItem value="pending" aria-label="Nehotové">
          Nesplněno
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

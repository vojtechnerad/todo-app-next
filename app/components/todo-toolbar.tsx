import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FilterX, Plus, Search } from 'lucide-react';

export default function TodoToolbar() {
  return (
    <div className="pr-2 pb-2">
      <Button>
        <Plus />
        Přidat
      </Button>
      <FilterX />
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
        <Input type="text" placeholder="Hledat úkoly..." className="pl-10" />
      </div>
    </div>
  );
}

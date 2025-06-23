'use client';

import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import Spinner from '@/components/ui/spinner';
import { ArrowLeft, Plus } from 'lucide-react';
import { addTodo } from '../actions/todo';

export default function NoTodoSelected() {
  const [isAddPending, setAddTransition] = useTransition();

  return (
    <div className="flex flex-col w-full items-center p-2 text-lg">
      <h2 className="pb-4">Žádné todo nezvoleno</h2>

      <p className="flex items-center pb-1">Vyberte existující v levém menu</p>

      <div className="pb-4">
        <ArrowLeft />
      </div>

      <p className="pb-1">Nebo vytvořte nové</p>
      <Button
        className="w-fit"
        onClick={async () => {
          setAddTransition(() => addTodo());
        }}
        disabled={isAddPending}
      >
        {isAddPending ? <Spinner /> : <Plus />}
        Přidat
      </Button>
    </div>
  );
}

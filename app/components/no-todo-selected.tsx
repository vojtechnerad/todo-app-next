'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
export default function NoTodoSelected() {
  const router = useRouter();
  return (
    <div>
      <h2>Žádné todo nezvoleno</h2>
      <p>Vyberte jej zleva</p>
      <p>Nebo vytvořte nové</p>
      <Button
        onClick={async () => {
          const response = await fetch('/api/todo', {
            method: 'POST',
            body: JSON.stringify({
              title: 'Nové todo',
            }),
          });

          if (response.ok) {
            const newTodo = await response.json();
            router.refresh();
            router.push(`/${newTodo.id}`);
          } else {
            // TODOvner
          }
        }}
      >
        Vytvořit nové
      </Button>
    </div>
  );
}

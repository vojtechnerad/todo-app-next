export function priorityToText(priority: number): string {
  if (priority < 1 || priority > 5) {
    console.error(`Priorita ${priority} není validní.`);
    return 'Neznámá priorita';
  }

  const priorityLabels: Record<number, string> = {
    1: 'Velmi nízká',
    2: 'Nízká',
    3: 'Střední',
    4: 'Vysoká',
    5: 'Velmi vysoká',
  };

  return priorityLabels[priority];
}
type PriorityVariant =
  | 'default'
  | 'lowestPriority'
  | 'lowPriority'
  | 'midPriority'
  | 'highPriority'
  | 'highestPriority';
export function priorityToVarinat(priority: number): PriorityVariant {
  const priorityLabels: Record<number, string> = {
    1: 'lowestPriority',
    2: 'lowPriority',
    3: 'midPriority',
    4: 'highPriority',
    5: 'highestPriority',
  };
  return (priorityLabels[priority] as PriorityVariant) ?? 'default';
}

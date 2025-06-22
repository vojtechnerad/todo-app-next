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

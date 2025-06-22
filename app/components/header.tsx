import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Header() {
  return (
    <div className="w-full flex justify-between p-2 bg-[#080808] select-none">
      <span className="text-2xl">Todo app</span>

      <div className="flex items-center gap-1">
        <Avatar>
          <AvatarFallback>VN</AvatarFallback>
        </Avatar>
        <span>Vojtěch Nerad</span>
      </div>
    </div>
  );
}

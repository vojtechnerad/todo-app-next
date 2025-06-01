import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  return (
    <div className="w-full flex justify-between p-2">
      <span className="text-2xl">Todo</span>

      <div className="flex items-center">
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span>Uživatel</span>
      </div>
    </div>
  );
}

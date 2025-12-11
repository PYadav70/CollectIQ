// src/components/SidebarItem.tsx
import type { ReactNode } from "react";

interface SidebarContentProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarContent = ({ icon, text, active, onClick }: SidebarContentProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium text-left
        transition-colors cursor-pointer
        ${active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"}
      `}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  );
};

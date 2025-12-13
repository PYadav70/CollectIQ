// src/components/SidebarItem.tsx
import type { ReactNode } from "react";

interface SidebarContentProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
  onClick?: () => void;
}

export const SidebarContent = ({
  icon,
  text,
  active,
  onClick,
}: SidebarContentProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full flex items-center gap-3
        px-4 sm:px-6
        py-2.5 sm:py-3
        text-sm sm:text-base
        font-medium text-left
        transition-colors cursor-pointer
        ${active
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-100"}
      `}
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{text}</span>
    </button>
  );
};

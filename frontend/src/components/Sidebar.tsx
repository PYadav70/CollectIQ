// src/components/Sidebar.tsx
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../icons/BrainIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { NoteIcon } from "../icons/NoteIcon";
import { NotionIcon } from "../icons/NotionIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { SidebarContent } from "./SidebarItem";

export type ContentType = "all" | "twitter" | "youtube" | "note" | "links" | "notion";

interface SidebarProps {
  activeFilter: ContentType;
  onFilterChange: (type: ContentType) => void;
}

export const Sidebar = ({ activeFilter, onFilterChange }: SidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block sm:h-screen sm:w-80 border-r-2 border-slate-300">
      <div
        onClick={() => navigate("/")}
        className="flex items-center justify-center mt-5 mb-10 cursor-pointer"
      >
        <BrainIcon size="xl" />
        <h1 className="text-4xl font-semibold ml-3">CollectIQ</h1>
      </div>

      {/* “All” */}
      <SidebarContent
        icon={<span className="text-lg">•</span>}
        text="All"
        active={activeFilter === "all"}
        onClick={() => onFilterChange("all")}
      />

      <SidebarContent
        icon={<TwitterIcon size="lg" />}
        text="Tweets"
        active={activeFilter === "twitter"}
        onClick={() => onFilterChange("twitter")}
      />
      <SidebarContent
        icon={<YouTubeIcon size="lg" />}
        text="Videos"
        active={activeFilter === "youtube"}
        onClick={() => onFilterChange("youtube")}
      />
      <SidebarContent
        icon={<NoteIcon size="lg" />}
        text="Document"
        active={activeFilter === "note"}
        onClick={() => onFilterChange("note")}
      />
      <SidebarContent
        icon={<LinkIcon size="lg" />}
        text="Links"
        active={activeFilter === "links"}
        onClick={() => onFilterChange("links")}
      />
      <SidebarContent
        icon={<NotionIcon size="lg" />}
        text="Notion"
        active={activeFilter === "notion"}
        onClick={() => onFilterChange("notion")}
      />
    </div>
  );
};

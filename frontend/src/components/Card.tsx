import { useEffect, useRef } from "react";
import ShareIcon from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { NoteIcon } from "../icons/NoteIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { NotionIcon } from "../icons/NotionIcon";
import { EditIcon } from "../icons/EditIcon";

const statusColors: any = {
  "to-learn": "bg-purple-100 text-purple-700",
  "in-progress": "bg-yellow-100 text-yellow-700",
  "done": "bg-green-100 text-green-700",
};

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "video" | "note" | "links" | "notion";
  details?: string;
  tags?: string[];
  onDelete?: () => void;
  onShare?: (link: string) => void;
  onEdit?: () => void;
  status: "to-learn" | "in-progress" | "done";
  visibility?: "public" | "friends" | "private";
  onStatusChange?: (newStatus: string) => void;
  isPinned: boolean;
  onPin?: () => void;
  onTagClick?: (tag: string) => void;
}

export const Card = ({
  title,
  link,
  type,
  details,
  tags,
  onDelete,
  onShare,
  onEdit,
  status,
   visibility,
  onStatusChange,
  onPin,
  isPinned,
  onTagClick
 
}: CardProps) => {

  /** ✅ NORMALIZE TYPE (IMPORTANT FIX) */
  const normalizedType =
    type === "video" ? "youtube" : type;

  const twitterRef = useRef<HTMLDivElement>(null);

  const iconMap: any = {
    youtube: <YouTubeIcon size="lg" />,
    twitter: <TwitterIcon size="lg" />,
    note: <NoteIcon size="lg" />,
    notion: <NotionIcon size="lg" />,
    links: <LinkIcon size="lg" />,
  };

  useEffect(() => {
    if (normalizedType === "twitter" && (window as any)?.twttr?.widgets) {
      (window as any).twttr.widgets.load(twitterRef.current);
    }
  }, [normalizedType, link]);

  const normalizedTwitterLink = link.replace("x.com", "twitter.com");

  const handleShare = () => {
    if (onShare) return onShare(link);
    navigator.clipboard.writeText(link).catch(() => { });
  };

  /** ✅ SAFE YOUTUBE EMBED */
  const getYoutubeEmbedUrl = () => {
    try {
      const url = new URL(link);
      return `https://www.youtube.com/embed/${url.searchParams.get("v")}`;
    } catch {
      return "";
    }
  };

  return (
    <div className="flex flex-col border border-slate-300 bg-white rounded-xl shadow-md w-full sm:w-[22rem] md:w-[24rem] p-4 sm:p-5 mx-auto mt-4">

      {/* HEADER */}
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {iconMap[normalizedType]}
          <p className="font-semibold truncate text-sm sm:text-base" title={title}>
            {title}
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onPin} className="text-lg">
            {isPinned ? "⭐" : "☆"}
          </button>
          <button onClick={handleShare}><ShareIcon size="lg" /></button>
          <button onClick={onEdit}><EditIcon size="lg" /></button>
          <button onClick={onDelete}><DeleteIcon size="lg" /></button>
        </div>
      </div>

      {/* Visibility Badge */}
      {visibility && (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
          {visibility === "public" && "🌍 Public"}
          {visibility === "friends" && "👥 Friends"}
          {visibility === "private" && "🔒 Only Me"}
        </span>
      )}




      {/* STATUS */}
      <div className="flex items-center gap-2 mt-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
          {status.replace("-", " ")}
        </span>

        <button
          className="text-xs px-3 py-1 border rounded-lg hover:bg-slate-100"
          onClick={() => {
            const cycle: any = {
              "to-learn": "in-progress",
              "in-progress": "done",
              "done": "to-learn",
            };
            onStatusChange?.(cycle[status]);
          }}
        >
          ⟳
        </button>
      </div>

      {/* CONTENT */}
      <div className="w-full mt-3 space-y-3">

        {/* YOUTUBE */}
        {normalizedType === "youtube" && getYoutubeEmbedUrl() && (
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={getYoutubeEmbedUrl()}
              allowFullScreen
            />
          </div>
        )}

        {/* TWITTER */}
        {normalizedType === "twitter" && (
          <div ref={twitterRef} className="border rounded-xl overflow-hidden">
            <blockquote className="twitter-tweet m-0 p-2">
              <a href={normalizedTwitterLink}></a>
            </blockquote>
          </div>
        )}

        {/* DETAILS (FIXED) */}
        {details && details.trim() !== "" && (
          <div className="p-3 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-700">
            {details}
          </div>
        )}
      </div>

      {/* TAGS */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((t) => (
            <span
              key={t}
              onClick={() => onTagClick?.(t)}
              className="cursor-pointer bg-slate-100 px-3 py-1 rounded-full 
                   text-[11px] font-medium text-slate-700 hover:bg-slate-200"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

    </div>
  );
};

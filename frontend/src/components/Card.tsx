
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
  type: "twitter" | "youtube" | "note" | "links" | "notion";
  detail?: string;
  tags?: string[];
  onDelete?: () => void;
  onShare?: (link: string) => void;
  onTagClick?: (tag: string) => void;
  onEdit?: () => void;
  status: "to-learn" | "in-progress" | "done";
  onStatusChange?: (newStatus: string) => void;
  isPinned: boolean;
  onPin?: ()=>void; 
}

export const Card = ({
  title,
  link,
  type,
  detail,
  tags,
  onDelete,
  onShare,
  onEdit,
  status,
  onStatusChange,
  onPin,
  isPinned
}: CardProps) => {
  const twitterRef = useRef<HTMLDivElement>(null);

  const iconMap = {
    youtube: <YouTubeIcon size="lg" />,
    twitter: <TwitterIcon size="lg" />,
    note: <NoteIcon size="lg" />,
    notion: <NotionIcon size="lg" />,
    links: <LinkIcon size="lg" />,
  };

  useEffect(() => {
    if (type === "twitter" && (window as any)?.twttr?.widgets) {
      (window as any).twttr.widgets.load(twitterRef.current);
    }
  }, [type, link]);

  const normalizedLink = link.replace("x.com", "twitter.com");

  const handleShare = () => {
    if (onShare) return onShare(link);
    navigator?.clipboard?.writeText(link).catch(() => { });
  };

 return (
  <div className="
    flex flex-col 
    border border-slate-300 
    bg-white 
    rounded-xl 
    shadow-md
    w-full 
    sm:w-[22rem] 
    md:w-[24rem]
    p-4 
    sm:p-5
    mx-auto
    mt-4
  ">

    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {iconMap[type]}
        <p className="font-semibold truncate text-sm sm:text-base" title={title}>
          {title}
        </p>
      </div>

      <div className="flex gap-3 justify-end flex-wrap sm:flex-nowrap">
        <button onClick={onPin} className="text-lg">
          {isPinned ? "⭐" : "☆"}
        </button>
        <button onClick={handleShare}><ShareIcon size="lg" /></button>
        <button onClick={onEdit}><EditIcon size="lg" /></button>
        <button onClick={onDelete}><DeleteIcon size="lg" /></button>
      </div>
    </div>

    {/* Status */}
    <div className="flex items-center gap-2 mt-3 flex-wrap">
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
      >
        {status.replace("-", " ")}
      </span>

      <button
        className="text-xs px-3 py-1 border rounded-lg hover:bg-slate-100"
        onClick={() => {
          const cycle = {
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

    {/* Content */}
    <div className="w-full mt-3 space-y-3">
      {type === "youtube" && (
        <div className="w-full aspect-video">
          <iframe
            className="w-full h-full rounded-xl"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            allowFullScreen
          />
        </div>
      )}

      {type === "twitter" && (
        <div
          ref={twitterRef}
          className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden"
        >
          <blockquote className="twitter-tweet m-0 p-2">
            <a href={normalizedLink}></a>
          </blockquote>
        </div>
      )}

      {type === "note" && (
        <div className="p-3 border border-slate-200 rounded-lg bg-slate-50 text-sm text-gray-700">
          <p className="word-break">{detail || link}</p>
        </div>
      )}
    </div>

    {/* Tags */}
    {tags && tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((t) => (
          <span
            key={t}
            className="bg-slate-100 px-3 py-1 rounded-full text-[11px] font-medium text-slate-700"
          >
            #{t}
          </span>
        ))}
      </div>
    )}
  </div>
);

};

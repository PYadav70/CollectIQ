// src/components/Card.tsx
import { useEffect, useRef } from "react";
import ShareIcon from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { NoteIcon } from "../icons/NoteIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { NotionIcon } from "../icons/NotionIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "note" | "links" | "notion";
  detail?: string;
  onDelete?: () => void;
  onShare?: (link: string) => void;
}

function getYouTubeEmbedUrl(url: string): string {
  if (url.includes("embed")) return url;

  try {
    if (url.includes("watch?v=")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return "";
  }
  return "";
}

export const Card = ({ title, link, type, detail, onDelete, onShare }: CardProps) => {
  const twitterRef = useRef<HTMLDivElement>(null);

  const iconMap = {
    youtube: <YouTubeIcon size="lg" />,
    twitter: <TwitterIcon size="lg" />,
    note: <NoteIcon size="lg" />,
    notion: <NotionIcon size="lg" />,
    links: <LinkIcon size="lg" />,
    share: <ShareIcon size="lg" />,
    delete: <DeleteIcon size="lg" />,
    plus: <PlusIcon size="lg" />,
  };

  useEffect(() => {
    if (type === "twitter" && window?.twttr?.widgets) {
      window.twttr.widgets.load(twitterRef.current);
    }
  }, [type, link]);

  const normalizedLink = link.replace("x.com", "twitter.com");

  const handleShare = () => {
    if (onShare) return onShare(link);
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(link).catch(() => {});
    }
  };

  return (
    <div className="flex flex-col border border-slate-300 h-auto w-80 overflow-hidden rounded-lg mt-5 ml-5 my-5 py-3 px-5 shadow-md">
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex gap-3">
          {iconMap[type]}
          <p className="font-semibold">{title}</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="cursor-pointer hover:text-slate-700"
          >
            <ShareIcon size="lg" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="cursor-pointer hover:text-red-600"
          >
            <DeleteIcon size="lg" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="w-full h-auto mt-2 mb-2">
        {type === "youtube" && (
          <iframe
            className="rounded-2xl min-h-72 w-full mt-5"
            src={getYouTubeEmbedUrl(link)}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <div ref={twitterRef}>
            <blockquote className="twitter-tweet">
              <a href={normalizedLink}></a>
            </blockquote>
          </div>
        )}

        {type === "note" && (
          <div className="p-3 h-full border border-slate-200 rounded-lg bg-slate-300 text-sm text-gray-700">
            <p className="break-words">{detail || link}</p>
          </div>
        )}
      </div>
    </div>
  );
};

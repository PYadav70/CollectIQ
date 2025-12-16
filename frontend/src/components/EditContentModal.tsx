// src/components/EditContentModal.tsx
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import type { Content } from "../hooks/UseContent";

const TAG_OPTIONS = ["AI", "DSA", "WebDev", "English", "Productivity"];

interface EditContentModalProps {
  open: boolean;
  onClose: () => void;
  content: Content | null;
  onUpdated: (updated: Content) => void;
}

export const EditContentModal = ({
  open,
  onClose,
  content,
  onUpdated,
}: EditContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const detailsRef = useRef<HTMLInputElement>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<
    "public" | "friends" | "private"
  >("public");


  useEffect(() => {
    if (!open || !content) return;

    if (titleRef.current) titleRef.current.value = content.title || "";
    if (linkRef.current) linkRef.current.value = content.link || "";
    if (detailsRef.current) detailsRef.current.value = content.details || "";
    if (typeRef.current) typeRef.current.value = content.type;


    setSelectedTags(content.tags || []);
    setVisibility(content.visibility || "public");
  }, [open, content]);

  if (!open || !content) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content/${content._id}`,
        {
          title: titleRef.current?.value,
          link: linkRef.current?.value,
          type: typeRef.current?.value,
          details: detailsRef.current?.value,
          tags: selectedTags,
          visibility
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpdated(res.data.content);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update content");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-0 overflow-y-auto">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative z-50 w-full max-w-md bg-white rounded-3xl shadow-2xl
        p-5 sm:p-8 my-6 sm:my-0 max-h-[90vh] overflow-y-auto"
      >
        <button
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-900"
          onClick={onClose}
        >
          <CrossIcon size="lg" />
        </button>

        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-5 sm:mb-6">
          Edit content
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:gap-4 w-full"
        >
          <Input inputRef={titleRef} type="text" placeholder="Title" />
          <Input inputRef={linkRef} type="url" placeholder="Link" />

          <select
            ref={typeRef}
            className="w-full px-4 sm:px-6 py-3 border rounded-lg outline-none cursor-pointer bg-white"
            defaultValue={content.type}
          >
            <option value="youtube">YouTube</option>
            <option value="twitter">Twitter</option>
            <option value="links">Links</option>
            <option value="note">Note</option>
            <option value="notion">Notion</option>
          </select>

          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(e.target.value as "public" | "friends" | "private")
            }
            className="w-full px-4 sm:px-6 py-3 border rounded-lg outline-none cursor-pointer bg-white"
          >
            <option value="public">🌍 Public</option>
            <option value="friends">👥 Friends</option>
            <option value="private">🔒 Only Me</option>
          </select>


          <Input
            inputRef={detailsRef}
            type="text"
            placeholder="Details (optional)"
          />

          {/* TAGS */}
          <div className="mt-2">
            <p className="text-xs font-semibold text-slate-600 mb-2">
              Tags (optional)
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {TAG_OPTIONS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${active
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 sm:mt-5 flex justify-center">
            <Button onClick={handleSubmit} variant="primary" text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

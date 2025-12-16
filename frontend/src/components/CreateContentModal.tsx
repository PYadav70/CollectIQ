import { type FormEvent, useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";


interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

// Predefined tags for Day 1
const TAG_OPTIONS = ["AI", "DSA", "WebDev", "English", "Productivity"];

export const CreateContentModel = ({ open, onClose }: CreateContentModelProps) => {
  const titleRef = useRef<HTMLInputElement>(null!);
  const linkRef = useRef<HTMLInputElement>(null!);
  const typeRef = useRef<HTMLSelectElement>(null!);
  const detailsRef = useRef<HTMLInputElement>(null!);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<"public" | "friends" | "private">("public");

  if (!open) return null;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addContent = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const title = titleRef.current?.value?.trim();
    const link = linkRef.current?.value?.trim();
    const type = typeRef.current?.value?.trim();
    const details = detailsRef.current?.value?.trim();

    if (!title || !link || !type) {
      alert("Please fill Title, Link and Type");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
        {
          title,
          link,
          type,
          details,
          tags: selectedTags, //  send tags to backend
          visibility
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // reset fields
      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      if (typeRef.current) typeRef.current.value = "";
      if (detailsRef.current) detailsRef.current.value = "";
      setSelectedTags([]);

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to create content");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-0 overflow-y-auto">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-50 w-full max-w-md bg-white rounded-3xl shadow-2xl 
        p-5 sm:p-8 my-6 sm:my-0 
        max-h-[90vh] overflow-y-auto
        animate-[fadeIn_0.25s_ease]"
      >

        {/* Close Button */}
        <button
          className="absolute right-4 top-4 text-slate-500 hover:text-slate-900 
          transition-colors cursor-pointer"
          onClick={onClose}
        >
          <CrossIcon size="lg" />
        </button>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-5 sm:mb-6">
          Add new content
        </h2>

        {/* Form */}
        <form onSubmit={addContent} className="flex flex-col gap-3 sm:gap-4 w-full">
          <Input inputRef={titleRef} type="text" placeholder="Title" />
          <Input inputRef={linkRef} type="url" placeholder="Link" />

          {/* Dropdown instead of text input */}
          <select
            ref={typeRef}
            className="w-full px-4 sm:px-6 py-3 border rounded-lg outline-none cursor-pointer bg-white"
            defaultValue='youtube'
          >

            <option value="youtube">YouTube</option>
            <option value="twitter">Twitter</option>
            <option value="links">Links</option>
            <option value="note">Note</option>
            <option value="notion">Notion</option>
          </select>

          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as any)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="public">🌍 Public</option>
            <option value="friends">👥 Friends</option>
            <option value="private">🔒 Only Me</option>
          </select>


          <Input inputRef={detailsRef} type="text" placeholder="Details" />

          {/* TAGS SECTION */}
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

          <div className="mt-4 sm:mt-5">
            <Button onClick={addContent} variant="primary" text="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

import { type FormEvent, useRef } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export const CreateContentModel = ({ open, onClose }: CreateContentModelProps) => {
  const titleRef = useRef<HTMLInputElement>(null as any);
  const linkRef = useRef<HTMLInputElement>(null as any);
  const typeRef = useRef<HTMLInputElement>(null as any);
  const detailsRef = useRef<HTMLInputElement>(null as any);

  if (!open) return null;

  const addContent = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) return;

    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const type = typeRef.current?.value;
    const details = detailsRef.current?.value;

    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        { title, link, type, details },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onClose();
    } catch {
      alert("Failed to create content");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-50 w-[90%] max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 
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
        <h2 className="text-xl font-semibold text-slate-800 mb-6">
          Add new content
        </h2>

        {/* Form */}
        <form onSubmit={addContent} className="flex flex-col gap-4">
          <Input reference={titleRef} type="text" placeholder="Title*" />
          <Input reference={linkRef} type="url" placeholder="Link*" />
          <Input reference={typeRef} type="text" placeholder="Type* (youtube, twitter, links...)" />
          <Input reference={detailsRef} type="text" placeholder="Details (optional)" />

          <div className="mt-2">
            <Button
              onClick={addContent}
              variant="primary"
              text="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

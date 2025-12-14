
import { useState } from "react";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import { Card } from "../components/Card";
import "../index.css";
import { CreateContentModel } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import type { ContentType } from "../components/Sidebar";
import { EditContentModal } from "../components/EditContentModal";
import type { Content } from "../hooks/UseContent";
import { useContent } from "../hooks/UseContent";
import axios from "axios";


type RowContent = Content & {
  isPinned?: boolean;
  details?: string;
};

function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<ContentType>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingContent, setEditingContent] = useState<Content | null>(null);

  const { contents, setContents } = useContent();
  const token = localStorage.getItem("token");

  // DELETE CONTENT
  const handleDelete = async (id: string) => {
    if (!token) {
      alert("You're not logged in");
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setContents((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete content");
    }
  };

  // toggle pin
  const togglePin = async (id: string) => {
    if (!token) {
      alert("You're not logged in");
      return;
    }

    // optimistic: flip locally immediately
    setContents((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, isPinned: !((c as any).isPinned) } : c
      )
    );

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content/${id}/pin`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updated = res.data.content as RowContent;

      // reconcile with server response
      setContents((prev) => prev.map((c) => (c._id === id ? updated : c)));
    } catch (err) {
      // revert optimistic change if error
      setContents((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, isPinned: !(c as any).isPinned } : c
        )
      );
      alert("Failed to update pin");
    }
  };

  // UPDATE STATUS (To Learn → In Progress → Done)
  const updateStatus = async (
    id: string,
    newStatus: "to-learn" | "in-progress" | "done"
  ) => {
    if (!token) {
      alert("You're not logged in");
      return;
    }

    // optimistic update
    setContents((prev) => prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c)));

    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/content/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      // revert on error (could re-fetch too)
      setContents((prev) => prev.map((c) => (c._id === id ? { ...c, status: "to-learn" } : c)));
      alert("Failed to update status");
    }
  };

  // TAG CLICK HANDLER
  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag)); // toggle
  };

  // ALL UNIQUE TAGS
  const allTags = Array.from(new Set(contents.flatMap((c) => c.tags || []))).filter(Boolean);

  // FILTER CONTENT
  const filteredContents = contents.filter((item) => {
    // Sidebar filter (Tweets, Videos, etc)
    if (activeFilter !== "all" && item.type !== activeFilter) return false;

    // Tag filter
    if (activeTag && !(item.tags || []).includes(activeTag)) return false;

    // Search filter
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;

    return (
      (item.title || "").toLowerCase().includes(q) ||
      (item.details || "").toLowerCase().includes(q) ||
      (item.link || "").toLowerCase().includes(q) ||
      (item.tags || []).join(" ").toLowerCase().includes(q)
    );
  });

  // ⭐ Sort pinned items to the top
  const sortedContents = [...filteredContents].sort((a, b) => {
    const ai = (a as RowContent).isPinned ? 1 : 0;
    const bi = (b as RowContent).isPinned ? 1 : 0;
    return bi - ai; // pinned first
  });

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar
        activeFilter={activeFilter}
        onFilterChange={(type) => setActiveFilter(type)}
      />

      {/* EDIT MODAL */}
      <EditContentModal
        open={!!editingContent}
        content={editingContent}
        onClose={() => setEditingContent(null)}
        onUpdated={(updated) => {
          setContents((prev) =>
            prev.map((c) => (c._id === updated._id ? updated : c))
          );
        }}
      />

      <div className="flex-1 w-full">
        {/* ADD CONTENT MODAL */}
        <CreateContentModel
          open={modelOpen}
          onClose={() => setModelOpen(false)}
        />

        {/* TOP BUTTON BAR */}
        <div className="flex flex-wrap justify-end items-center gap-3 mt-4 px-4 sm:px-6 lg:px-10">
          <Button
            onClick={async () => {
              if (!token) return alert("You're not logged in");
              try {
                const response = await axios.post(
                  `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                await navigator.clipboard.writeText(shareUrl);
                alert("Copied to clipboard!");
              } catch {
                alert("Failed to generate share link");
              }
            }}
            startIcon={<ShareIcon size="lg" />}
            variant="secondary"
            size="md"
            text="Share"
          />

          <Button
            onClick={() => setModelOpen(true)}
            startIcon={<PlusIcon size="lg" />}
            variant="primary"
            size="md"
            text="Add content"
          />
        </div>

        {/* TAGS + SEARCH BAR */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4 px-4 sm:px-6 lg:px-10 gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {allTags.length > 0 && (
              <>
                <button
                  onClick={() => setActiveTag(null)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    activeTag === null
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  All tags
                </button>

                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      activeTag === tag
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-slate-700 border-slate-200"
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Search */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, link, tags..."
              className="w-full px-4 py-2 text-sm rounded-full border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* CONTENT CARDS */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mt-6 px-2 sm:px-4 lg:px-6">
          {sortedContents.map((item) => (
            <Card
              key={item._id}
              title={item.title || ""}
              link={item.link}
              type={item.type}
              detail={item.details}
              tags={item.tags}
              status={item.status || "to-learn"}
              isPinned={(item as RowContent).isPinned || false}
              onPin={() => togglePin(item._id)}
              //@ts-ignore
              onStatusChange={(s) => updateStatus(item._id, s)}
              onDelete={() => handleDelete(item._id)}
              onTagClick={handleTagClick}
              onEdit={() => setEditingContent(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

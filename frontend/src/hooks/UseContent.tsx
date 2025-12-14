// src/hooks/useContent.ts
import axios from "axios";
import { useEffect, useState } from "react";


export interface Content {
  _id: string;
  title?: string;
  link: string;
  type: "twitter" | "youtube" | "note" | "links" | "notion";
  details?: string;
  tags?: string[];
   status: "to-learn" | "in-progress" | "done";  //status update
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);

  const fetchContents = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContents(res.data.content || []);
    } catch (err) {
      console.error("Failed to fetch content", err);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  return { contents, setContents, fetchContents };
}

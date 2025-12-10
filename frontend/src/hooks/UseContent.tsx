// src/hooks/UseContent.ts
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Content {
  _id: string;         // change to id/content if your backend uses that
  title: string;
  link: string;
  type: "twitter" | "youtube" | "note" | "links" | "notion";
  detail?: string;
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);

  const fetchContents = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
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

// src/pages/Dashboard.tsx
import { useState } from "react";
import { Button } from "../components/Button";
import { PlusIcon } from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import { Card } from "../components/Card";
import "../index.css";
import { CreateContentModel } from "../components/CreateContentModal";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/UseContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const { contents, setContents } = useContent();   // 👈 changed
  const token = localStorage.getItem("token");

  const handleDelete = async (id: string) => {
    if (!token) {
      alert("You're not logged in");
      return;
    }

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // remove from UI
      setContents((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete content");
    }
  };

  return (
    <div className="h-screen flex justify-center lg:justify-normal">
      <div>
        <Sidebar />
      </div>

      <div>
        <CreateContentModel
          open={modelOpen}
          onClose={() => setModelOpen(false)}
          // onCreated={() => fetchContents()}  // if you add it in hook
        />

        <div className="flex justify-end items-end mt-5 mr-10 h-auto">
          <Button
            onClick={async () => {
              if (!token) {
                alert("You're not logged in");
                return;
              }
              try {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
                await navigator.clipboard.writeText(shareUrl);
                alert("Copied to clipboard!");
              } catch (error) {
                console.error("Share failed:", error);
                alert("Failed to generate share link");
              }
            }}
            startIcon={<ShareIcon size={"lg"} />}
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

        <div className="flex justify-around items-center flex-col sm:flex-row flex-wrap">
          {contents.map(({ _id, title, link, type, detail }) => (
            <Card
              key={_id}
              title={title}
              link={link}
              type={type}
              detail={detail}
              onDelete={() => handleDelete(_id)}   // 👈 wired delete
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

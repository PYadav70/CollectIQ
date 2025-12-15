import axios from "axios";

interface ProfileAvatarProps {
  username: string;
  imageUrl?: string;
  onLogout?: () => void;
}

export function ProfileAvatar({ username, imageUrl, onLogout }: ProfileAvatarProps) {
  const initials = username
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/profile/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("avatar", res.data.avatar);
    window.location.reload(); // OK for now
  };

  return (
    <div className="relative flex items-center gap-2">
      <label className="cursor-pointer">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            e.target.files && uploadImage(e.target.files[0])
          }
        />
      </label>

      {onLogout && (
        <button
          onClick={onLogout}
          className="text-xs text-red-500 hover:underline"
        >
          Logout
        </button>
      )}
    </div>
  );
}

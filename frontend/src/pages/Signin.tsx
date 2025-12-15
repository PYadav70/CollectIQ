// src/pages/Signin.tsx
import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { CrossIcon } from "../icons/CrossIcon";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
  const username = usernameRef.current?.value;
  const password = passwordRef.current?.value;

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`,
      { username, password }
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.username);

    navigate("/dashboard");
  } catch (err: any) {
    console.error("Signin failed:", err.response?.data || err.message);
    alert(err.response?.data?.msg || "Signin failed");
  }
}


  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="relative flex flex-col items-center justify-center rounded-xl bg-slate-300 h-96 w-80">
        <h1 className="text-2xl font-medium absolute top-4 left-10">Signin</h1>

        <div
          onClick={() => navigate("/")}
          className="absolute top-2 right-3 cursor-pointer"
        >
          <CrossIcon size="lg" />
        </div>

        <div className="flex flex-col gap-5">
          <Input type="text" inputRef={usernameRef} placeholder="Username" />
          <Input type="password" inputRef={passwordRef} placeholder="Password" />

          <Button onClick={signin} variant="primary" text="Signin" />
        </div>

        <p className="mt-3 text-sm">
          Don’t have an account?
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer ml-2"
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

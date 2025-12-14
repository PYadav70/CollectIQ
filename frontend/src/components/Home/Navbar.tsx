import { BrainIcon } from "../../icons/BrainIcon";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full px-4 sm:px-6 lg:px-10 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer"
        >
          <BrainIcon size="lg" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            CollectIQ
          </h1>
        </div>

        {/* CTA Button */}
        <div>
          <Button
            variant="primary"
            size="md"
            text="Signup"
            onClick={() => navigate("/signup")}
          />
        </div>
      </div>
    </nav>
  );
};

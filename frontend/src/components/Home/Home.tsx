import { Button } from "../Button";
import { Navbar } from "./Navbar";

export const Home = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen w-full flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center flex-1 px-4 sm:px-6 md:px-10 text-center">
        {/* Heading */}
        <h1
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            font-bold
            mt-6
            leading-tight
          "
        >
          Welcome to{" "}
          <span className="text-orange-600">CollectIQ</span>
        </h1>

        {/* Subheading */}
        <p
          className="
            text-base
            sm:text-lg
            md:text-xl
            lg:text-2xl
            mt-4
            sm:mt-6
            font-medium
            text-gray-300
          "
        >
          Your Second Brain for a Smarter You
        </p>

        {/* Description */}
        <p
          className="
            text-sm
            sm:text-base
            md:text-lg
            text-gray-400
            mt-4
            sm:mt-6
            max-w-sm
            sm:max-w-md
            md:max-w-lg
            leading-relaxed
          "
        >
          Store your thoughts, save content you care about, and organize
          everything in one place. From creators to coders, CollectIQ gives your
          ideas a home.
        </p>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-10">
          <Button
            variant="primary"
            size="lg"
            text="Get Started For Free →"
            onClick={() => {
              window.location.href = "/signin";
            }}
          />
        </div>
      </div>
    </div>
  );
};

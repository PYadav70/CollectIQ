interface InputProps {
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  type: string;
}

export function Input({ placeholder, inputRef, type }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        className="
          w-full
          px-4 sm:px-6
          py-2.5 sm:py-3
          border
          rounded-lg
          outline-none
          text-sm sm:text-base
        "
      />
    </div>
  );
}

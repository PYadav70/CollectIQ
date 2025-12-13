interface InputProps {
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  type: string;
}

export function Input({ placeholder, inputRef, type }: InputProps) {
  return (
    <div className="w-full">
      <input
        className="
          w-full
          px-4 sm:px-6
          py-2.5 sm:py-3
          border
          rounded-lg
          outline-none
          text-sm sm:text-base
        "
        placeholder={placeholder}
        ref={inputRef}
        type={type}
      />
    </div>
  );
}

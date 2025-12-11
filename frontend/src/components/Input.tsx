interface InputProps {
  placeholder: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  type: string;
}

export function Input({ placeholder, inputRef, type }: InputProps) {
  return (
    <div className="w-full">
      <input
        className="w-full px-6 py-3 border rounded-lg outline-none"
        placeholder={placeholder}
        ref={inputRef}
        type={type}
      />
    </div>
  );
}

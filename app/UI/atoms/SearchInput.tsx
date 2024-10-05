import { ChangeEvent, FC } from "react";

interface SearchProps {
  placeholder: string;
  type?: string; // Made optional with a default in the component
  name: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const SearchInput: FC<SearchProps> = ({
  placeholder,
  type = "text",
  name,
  id,
  onChange,
  value,
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="border-none outline-none bg-transparent w-full"
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
    />
  );
};

export default SearchInput;

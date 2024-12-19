import React, { ChangeEvent } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void; 
}

const SearchField: React.FC<SearchFieldProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex min-w-[300px] w-full items-center border-[1.5px] border-white rounded-full overflow-hidden ">
      {/* Input Field */}
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search..."
        aria-label="Search"
        className="flex-grow px-4 w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
      />

      {/* Search Button */}
      <button
        onClick={onSearch}
        aria-label="Search"
        className="flex items-center justify-center bg-Gary-700 text-white p-2 rounded-r-full  transition"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchField;

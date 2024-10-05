import svg from "@/app/data/svgIcon";
import SearchInput from "../atoms/SearchInput";
import { ChangeEvent } from "react";

interface SearchFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const SearchField: React.FC<SearchFieldProps> = ({ value, onChange }) => {
  return (
    <div className="2xl:min-w-[400px] lg:min-w-[200px] xl:min-w-[250px] px-3 h-[38px] 2xl:h-[48px] border-[1px] border-[#ffffff]  flex gap-[10px] rounded-full">
      <div className="flex items-center justify-start">{svg.search}</div>
      <div className="w-full flex items-center justify-start">
      <SearchInput
          value={value}
          onChange={onChange}
          id="search"
          name="search"
          placeholder="Search the Products"
          type="text"
        /> 
      </div>
    </div>
  );
};

export default SearchField;

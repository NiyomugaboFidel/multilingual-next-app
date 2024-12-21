import {ReactNode } from "react";
import Icon from "../atoms/Icon";
import Selector from "../atoms/Selector";

interface SelectData {
  value: string;
  label: string;
}

interface Select {
  SelectList: SelectData[];
  value: string;
  className: string;
  iconName?: string;
  iconTag?: ReactNode;
  onChange: (value: string) => void;
  name: string;
}
const SelectField: React.FC<Select> = ({
  SelectList,
  value,
  className,
  iconName,
  iconTag,
  onChange,
  name,
}) => {
  return (
    <div
      className={`${className} min-w-[260px] relative px-[16px] gap-[10px] py-[9px] rounded-[8px] border border-Gary-300  flex items-center justify-center transition-all ease-in-out duration-500 `}
    >
      <Icon
        iconName={"input-l.svg"}
        icontype={false}
        className={` ${
          value ? "hidden" : "flex"
        } transition-all ease-in-out duration-500 hover:bg-transparent `}
      />
      <Selector
        name={name}
        value={value}
        onChange={(value) => onChange(value)}
        SelectList={SelectList}
      />
      <Icon
        iconName={"input-l.svg"}
        icontype={false}
        className={` ${
          value ? "flex" : "hidden"
        } transition-all ease-in-out duration-500 hover:bg-transparent `}
      />
      {iconName ? (
        <Icon
          iconName={iconName}
          icontype={false}
          className={`${
            value ? "flex" : "hidden"
          } transition-all ease-in-out duration-500  hover:bg-transparent `}
        />
      ) : (
        <Icon
          iconTag={iconTag}
          icontype={false}
          className={`${
            value ? "flex" : "hidden"
          } transition-all ease-in-out duration-500  hover:bg-transparent `}
        />
      )}
    </div>
  );
};

export default SelectField;

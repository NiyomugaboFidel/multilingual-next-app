import { ChangeEvent, ReactNode, useState } from "react";
import Input from "../atoms/Input";
import Icon from "../atoms/Icon";
import Lable from "../atoms/Lable";

interface InputField {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  iconName?: string;
  iconTag?: ReactNode;
  registeration?: any;
  label?: string;
  id?: string;
  errorMessage?: string;
}
const FormField: React.FC<InputField> = ({
  type,
  onChange,
  name,
  registeration,
  id,
  value,
  className,
  placeholder,
  iconName,
  iconTag,
  label,
  errorMessage,
  ...props
}) => {

  return (
    <div className="w-full">
      <div className="w-full ">{label && <Lable label={label} id="" />}</div>
      <div
        className={`${className} focus:border-2 min-w-[260px] px-[16px] gap-[10px] py-[9px] rounded-[8px] border border-Gary-300 dark:border-Gary-700  flex items-center justify-center transition-all ease-in-out duration-500 `}
      >
        {/* <Icon
          iconName={"input-l.svg"}
          icontype={false}
          className={` ${
            registeration ? "hidden" : "flex"
          } transition-all ease-in-out duration-500 hover:bg-transparent `}
        /> */}

        <div className="w-full">
          <Input 
          type={type}
          value={value}
          name={name} 
          registeration={registeration}
          id={id} 
          placeholder={placeholder}
          onChange={onChange}
          {...props} />
        </div>

        <Icon
          iconName={"input-l.svg"}
          icontype={false}
          className={` ${
            errorMessage ? "flex" : "hidden"
          } transition-all ease-in-out duration-500 hover:bg-transparent `}
        />
        {iconName ? (
          <Icon
            iconName={iconName}
            icontype={false}
            className={`${
              errorMessage ? "flex" : "hidden"
            } transition-all ease-in-out duration-500  hover:bg-transparent `}
          />
        ) : (
          <Icon
            iconTag={iconTag}
            icontype={false}
            className={`${
              errorMessage ? "flex" : "hidden"
            } transition-all ease-in-out duration-500  hover:bg-transparent `}
          />
        )}
      </div>
      <div className="w-full">
        {errorMessage && (
          <p className={"text-[12px] leading-[18px] text-red-500"}>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default FormField;

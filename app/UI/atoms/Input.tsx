import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  autoComplete?: string;
  registeration?:any
  isLoading?: boolean;
  disabled?: boolean;
  value?: string | any;
  id?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  id,
  name,
  value,
  onChange,
  disabled,
  isLoading,
  autoFocus,
  autoComplete,
  placeholder,
  registeration,
  ...props
}, ref) => {
  return (
    <input
      id={id}
      type={type}
      className="border-none outline-none bg-transparent w-full"
      name={name}
      disabled={disabled || isLoading || false}
      placeholder={placeholder}
      autoComplete={'off'}
      autoFocus={autoFocus}
      ref={ref}
      {...registeration}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
});

Input.displayName = 'Input'; // To avoid issues with anonymous components in dev tools

export default Input;

import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded-md  bg-white px-3 py-2  text-base file:border-0 file:bg-transparent file:text-sm file:font-medium  outline-none border-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

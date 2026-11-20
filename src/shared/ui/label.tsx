import { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

export const Label = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  function Label({ className, ...props }, ref) {
    return (
      <label
        ref={ref}
        className={cn("text-sm font-medium text-zinc-200", className)}
        {...props}
      />
    );
  },
);

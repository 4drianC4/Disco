import { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant = "default", size = "default", type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-violet-600 text-white hover:bg-violet-700",
          variant === "secondary" && "bg-zinc-800 text-zinc-100 hover:bg-zinc-700",
          variant === "ghost" && "hover:bg-zinc-800 hover:text-zinc-100",
          variant === "destructive" && "bg-red-600 text-white hover:bg-red-700",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 px-3",
          size === "lg" && "h-11 px-8",
          className,
        )}
        {...props}
      />
    );
  },
);

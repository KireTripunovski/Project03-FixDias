import React from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      onClick,
      type = "button",
      variant = "primary",
      size = "medium",
      disabled = false,
      loading = false,
      fullWidth = false,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = "rounded-lg font-medium  focus:outline-none ";

    const variantClasses: Record<ButtonVariant, string> = {
      primary: "bg-orange-500 hover:bg-orange-600 text-white ",
      secondary: "bg-gray-200 -300 text-gray-800 ",
      outline: "border",
      danger: "bg-red-500 hover:bg-red-600 text-white ",
      ghost: "text-gray-700 ",
    };

    const sizeClasses: Record<ButtonSize, string> = {
      small: "py-1 px-3 text-sm",
      medium: "py-2 px-4 text-base",
      large: "py-3 px-6 text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses[variant]} ${
          sizeClasses[size]
        } ${widthClass} ${className} ${
          disabled ? "opacity-70 cursor-not-allowed" : ""
        }`}
        {...props}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={18} />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

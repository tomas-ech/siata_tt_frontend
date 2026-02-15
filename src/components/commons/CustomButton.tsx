interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "alert" | "border";
  isDisabled?: boolean;
  isSelected?: boolean;
}

export const CustomButton = ({
  children,
  variant = "primary",
  isSelected = false,
  isDisabled,
  ...props
}: ButtonProps) => {
  const themes = {
    primary: !isSelected 
      ? "bg-primary text-white hover:bg-primary-hover" 
      : "bg-primary-hover text-white ",
    secondary: !isSelected 
      ? "bg-secondary text-white hover:bg-secondary-hover" 
      : "bg-secondary-hover text-white ",
    border: !isSelected 
      ? "border-2 border-transparent hover:border-secondary" 
      : "border-2 border-secondary",
    alert: "flex items-center gap-2 text-error hover:text-error-focus"
  };

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`w-full py-3 rounded-lg font-semibold disabled:cursor-not-allowed disabled:bg-gray-1 transition-colors cursor-pointer ${themes[variant]}`}
    >
      {children}
    </button>
  );
};

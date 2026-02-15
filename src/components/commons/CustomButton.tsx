interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
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
    
    secondary: "bg-secondary text-white bg-secondary-hover ",
  };

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`w-full py-3 rounded-lg font-semibold disabled:cursor-not-allowed disabled:bg-gray-1 transition-colors ${themes[variant]}`}
    >
      {children}
    </button>
  );
};

import { memo } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  size?: "sm" | "lg";
  form?: string;
  type?: "submit" | "reset" | "button";
  onClick?: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ...args: unknown[]
  ) => void | HTMLElement | JQuery<HTMLElement> | React.ReactNode;
  dataBsToggle?: string;
  dataBsTarget?: string;
  dataBsDismiss?: string;
  className?: string;
  ref?: React.RefObject<HTMLButtonElement | HTMLElement>;
}

const Button = ({
  children,
  size,
  color,
  form,
  type = "button",
  onClick,
  dataBsToggle,
  dataBsDismiss,
  dataBsTarget,
  className,
}: ButtonProps) => {
  const btnSize = size ? " btn-" + size : "";
  const btnColor = color ? " btn-" + color : "";

  return (
    <button
      className={"btn" + btnColor + " " + btnSize + " " + className}
      type={type}
      form={form} 
      onClick={onClick}
      data-bs-toggle={dataBsToggle}
      data-bs-target={dataBsTarget}
      data-bs-dismiss={dataBsDismiss}
    >
      {children}
    </button>
  );
};

export default memo(Button);

import React from "react";
import '../../../theme/components/core/button.scss'

interface buttonProps {
  disabled?: boolean
  onClick?: () => void
  active?: boolean
  children?: React.ReactNode
  type?: "button" | "submit" | "reset" | undefined
};

const Button : React.FC<buttonProps> = (props) => {
  const {
    disabled,
    onClick,
    active,
    children,
    type
  } = props;

  return (
    <button
      className={`button ${active && 'button-active'}`}
      onClick={onClick}
      disabled={disabled}
      data-testid="button"
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

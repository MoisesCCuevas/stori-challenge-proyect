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
      {/* {
        React.Children
          .toArray(children)
          .map((c: any) => React.cloneElement(c, { disabled }))
      } */}
      {children}
    </button>
  );
};

export default Button;

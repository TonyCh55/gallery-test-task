import React from "react";
import cross from "@/icons/CloseFilled.svg";
import chevronLeft from "@/icons/ChevronLeftOutlined.svg";
import chevronRight from "@/icons/ChevronRightOutlined.svg";
import chevronDown from "@/icons/ChevronDown.svg";
import clsx from "clsx";
import s from "./styles.module.scss";

const Icons = {
  cross,
  chevronLeft,
  chevronRight,
  chevronDown,
};

type ButtonProps = React.HTMLProps<HTMLButtonElement>;
type ButtonIconProps = {
  icon: keyof typeof Icons;
  className?: string;
} & ButtonProps;

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  ({ icon, className, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        type="button"
        className={clsx(s.button, className)}
      >
        <img src={Icons[icon]} />
      </button>
    );
  }
);

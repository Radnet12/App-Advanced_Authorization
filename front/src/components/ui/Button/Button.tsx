import { FC, ReactNode, ButtonHTMLAttributes } from "react";

// Styles
import s from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}

export const Button: FC<ButtonProps> = (props) => {
    // **Props
    const { type, children, ...rest } = props;

    return (
        <button className={s.button} type={type} {...rest}>
            {children}
        </button>
    );
};

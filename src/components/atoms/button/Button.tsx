import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string; 
    onClick: React.MouseEventHandler<HTMLButtonElement>; 
    type?: "button" | "submit" | "reset"; 
    className?: string;
    children?: React.ReactNode; 
}

const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = "button", 
    className = "",
    children,
    ...rest
}) => {
    return (
        <button type={type} onClick={onClick} className={className} {...rest}>
            {children || label || "Default Button"}
        </button>
    );
};

export default Button;

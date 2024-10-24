import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string; 
    className?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    className = "",
    ...rest
}) => {
    return (
        <div className={`input-container ${className}`}>
            {label && <label className="input-label" htmlFor={rest.id}>{label}</label>}
            <input className={`input-field ${className}`} {...rest} />
        </div>
    );
};

export default Input;

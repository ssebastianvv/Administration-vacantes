import React from "react";

interface LabelProps {
    text: string;
    htmlFor?: string;
    className?: string;
}

const Label: React.FC<LabelProps> = ({ text, htmlFor, className = "" }) => {
    return (
        <label htmlFor={htmlFor} className={`label ${className}`}>
            {text}
        </label>
    );
};
2
export default Label;

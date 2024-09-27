import React from 'react';

const Button = ({label, onClick, className, disabled}) => {
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {label}
        </button>
    )
};

export default Button;
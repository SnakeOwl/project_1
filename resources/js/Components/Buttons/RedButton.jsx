import React from 'react';

export default function RedButton({
    className = '',
    children,
    type,
    handleClick,
}){
    return (
        <button
            className={'bttn red ' + className}
            type={type}
            onClick={handleClick}
            >
            {children}
        </button>
    );
}

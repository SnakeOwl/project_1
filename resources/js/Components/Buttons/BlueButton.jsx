import React from 'react';

export default function BlueButton({
    className = '',
    children,
    type,
    handleClick,
}){
    return (
        <button
            className={'bttn blue ' + className}
            type={type}
            onClick={handleClick}
            >
            {children}
        </button>
    );
}

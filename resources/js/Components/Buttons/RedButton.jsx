import React from 'react';

export default function RedButton({
    className = '',
    children,
    type,
    onHandleClick,
    title,
}){
    return (
        <button
            className={'bttn red ' + className}
            type={type}
            onClick={onHandleClick}
            title={title}
            >
            {children}
        </button>
    );
}

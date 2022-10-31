import React from 'react';

export default function RedLink({
    className = '',
    href='#',
    clickHandler,
    children,
}){
    return (
        <a className={'bttn red' + className}
            href={href}
            onClick={ (e) => clickHandler(e) }
            >
            {children}
            </a>
    );
}

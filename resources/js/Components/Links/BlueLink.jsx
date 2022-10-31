import React from 'react';

export default function BlueLink({
    className = '',
    href='#',
    children,
}){
    return (
        <a className={'bttn blue ' + className}
            href={href}>
            {children}
            </a>
    );
}

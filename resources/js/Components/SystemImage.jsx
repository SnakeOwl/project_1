import React from 'react';

export default function SystemImage({
    className = '',
    src,
    alt,
}){
    return (
        <img src={src}
            className={'' + className}
            alt={alt}
            />
    );
}

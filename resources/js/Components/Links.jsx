import { InertiaLink } from '@inertiajs/inertia-react';

export function Link({
    children,
    href,
    className,
    title,
    disabled=false
}){
    className += disabled? " disabled": "";

    return (
        <InertiaLink
            href={href}
            title={title}
            className={className}
        >
            {children}
        </InertiaLink>

    );
}

export function BlueLink({
    className = '',
    href='#',
    children,
    title,
    disabled
}){
    return (
        <Link
            className={'bttn blue ' + className}
            href={href}
            title={title}
            disabled={disabled}
        >
            {children}
        </Link>
    );
}

export function GreenLink({
    className = '',
    href='#',
    children,
    title,
    disabled
}){
    return (
        <Link
            className={'bttn green ' + className}
            href={href}
            title={title}
            disabled={disabled}
        >
            {children}
        </Link>
    );
}

export function RedLink({
    className='',
    href='#',
    children,
    title,
    disabled,
}){
    return (
        <Link className={'bttn red ' + className}
            href={href}
            title={title}
            disabled={disabled}
        >
            {children}
        </Link>
    );
}

export default Link;
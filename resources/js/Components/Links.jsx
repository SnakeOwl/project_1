import { InertiaLink } from '@inertiajs/inertia-react';

export function ILink({
    className,
    href='#',
    children,
    title,
    disabled
}){
    return (
        <InertiaLink
            className={className}
            href={href}
            title={title}
            disabled={disabled}
        >
            {children}
        </InertiaLink>
    );
}

export function Link(props){
    return (
        <ILink
            {...props}
        />
    );
}

export function BlueLink(props){
    return (
        <ILink
            {...props}
            className={`bttn blue ${props.className}`}
        />
    );
}

export function GreenLink(props){
    return (
        <ILink
            {...props}
            className={`bttn green ${props.className}`}
        />
    );
}

export function RedLink(props){
    return (
        <ILink
            {...props}
            className={`bttn red ${props.className}`}
        />
    );
}

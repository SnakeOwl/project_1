import { InertiaLink } from '@inertiajs/inertia-react';

export default function Link({
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

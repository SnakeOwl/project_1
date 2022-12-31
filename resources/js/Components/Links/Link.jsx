export default function Link({
    children,
    href,
    className,
    disabled=false
}){
    className += disabled? " disabled": "";

    return (
        <a
            href={href}
            className={className}
        >
            {children}
        </a>

    );
}

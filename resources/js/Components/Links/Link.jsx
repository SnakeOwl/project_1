export default function Link({
    children,
    href,
    className,
    title,
    disabled=false
}){
    className += disabled? " disabled": "";

    return (
        <a
            href={href}
            title={title}
            className={className}
        >
            {children}
        </a>

    );
}

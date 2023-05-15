import { Link } from "react-router-dom";

export function ILink({
    to, 
    className,
    children,
    title,
    disabled
}){
    return (
        <Link
            to={to}
            className={className}
            title={title}
            disabled={disabled}
        >
        {children}
        </Link>
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
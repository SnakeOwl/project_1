import { Link } from "react-router-dom";

export default Link;

export function BlueLink({
    to, 
    className,
    children
}){
    return (
        <Link
            to={to}
            className={"bttn blue " + className}
        >
            {children}
        </Link>
    );
}

export function GreenLink({
    to, 
    className,
    children
}){
    return (
        <Link
            to={to}
            className={"bttn green " + className}
        >
            {children}
        </Link>
    );
}

export function RedLink({
    to, 
    className,
    children
}){
    return (
        <Link
            to={to}
            className={"bttn red " + className}
        >
            {children}
        </Link>
    );
}
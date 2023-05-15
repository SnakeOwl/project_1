import { RedLink } from "../Links";

export default function BasketButton({
    className,
    children
}){
    return (
        <RedLink
            className={`text-red rounded ${className}`}
            href='/basket'
        >
            {children}
        </RedLink>
    );
}

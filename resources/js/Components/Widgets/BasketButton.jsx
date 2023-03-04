import RedLink from '@/Components/Links/RedLink';

export default function BasketButton({
    className,
    children
}){
    return (
        <RedLink
            className={"text-red rounded " + className}
            href={route('basket')}
        >
            {children}
        </RedLink>
    );
}

import Link from './Link';

export default function BlueLink({
    className = '',
    href='#',
    children,
    disabled
}){
    return (
        <Link
            className={'bttn blue ' + className}
            href={href}
            disabled={disabled}
        >
            {children}
        </Link>
    );
}

import Link from './Link';

export default function BlueLink({
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

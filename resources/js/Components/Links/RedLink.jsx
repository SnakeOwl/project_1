import Link from './Link';

export default function RedLink({
    className='',
    href='#',
    children,
    title,
    disabled,
}){
    return (
        <Link className={'bttn red ' + className}
            href={href}
            title={title}
            disabled={disabled}
        >
            {children}
        </Link>
    );
}

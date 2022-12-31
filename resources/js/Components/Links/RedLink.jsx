import Link from './Link';

export default function RedLink({
    className='',
    href='#',
    children,
    disabled,
}){
    return (
        <a className={'bttn red ' + className}
            href={href}
            disabled={disabled}
        >
            {children}
        </a>
    );
}

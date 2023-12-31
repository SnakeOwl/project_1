import Link from "next/link"


interface IProps extends React.InputHTMLAttributes<HTMLAnchorElement> {
    className?: string
    children: string | React.ReactNode
    href: string
}


export function BlueLink({
    children,
    href,
    className = "",
    ...other
}: IProps) {
    return (
        <Link
            className={" \
            text-white \
            bg-blue-600 \
            border border-blue-600 \
            hover:bg-inherit \
            hover:text-blue-600 \
            duration-300 \
             " + className}
            href={href}
            {...other}
        >
            {children}
        </Link>
    )
}


export function BlueLinkReversed({
    children,
    href,
    className = "",
    ...other
}: IProps) {
    return (
        <Link
            className={" \
            text-blue-600 \
            border border-blue-600 \
            hover:text-white \
            hover:bg-blue-600 \
            duration-300 \
             " + className}
            href={href}
            {...other}
        >
            {children}
        </Link>
    )
}


export function RedLink({
    children,
    href,
    className = "",
    ...other
}: IProps) {
    return (
        <Link
            className={" \
            text-white \
            bg-red-500 \
            border border-red-500 \
            hover:bg-inherit \
            hover:text-red-500 \
            duration-300 \
             " + className}
            href={href}
            {...other}
        >
            {children}
        </Link>
    )
}



export function RedLinkReversed({
    children,
    href,
    className = "",
    ...other
}: IProps) {
    return (
        <Link
            className={" \
            text-red-500 \
            hover:text-white \
            hover:bg-red-500 \
            border border-red-500 \
            duration-300 \
             " + className}
            href={href}
            {...other}

        >
            {children}
        </Link>
    )
}
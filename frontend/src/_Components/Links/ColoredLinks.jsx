import Link from "next/link"

export function BlueLink({
    children,
    className="",
    href,
    target = "_self"
}) {
    return (
        <Link
            className={" \
            text-white \
            bg-blue-600 \
            hover:bg-inherit \
            hover:ring-1 \
            hover:ring-blue-600 \
            hover:text-blue-600 \
            duration-300 \
             " + className}
            href={href}
            target={target}
        >
            {children}
        </Link>
    )
}
export function BlueLinkReversed({
    children,
    className="",
    href,
    target = "_self"
}) {
    return (
        <Link
            className={" \
            text-blue-600 \
             \
            hover:text-white \
            hover:bg-blue-600 \
            ring-1 \
            ring-blue-600 \
            duration-300 \
             " + className}
            href={href}
            target={target}
        >
            {children}
        </Link>
    )
}


export function RedLink({
    children,
    className="",
    href,
    target = "_self"
}) {
    return (
        <Link
            className={" \
            text-white \
            bg-red-500 \
            hover:bg-inherit \
            hover:ring-1 \
            hover:ring-red-500 \
            hover:text-red-500 \
            duration-300 \
             " + className}
            href={href}
            target={target}
        >
            {children}
        </Link>
    )
}
export function RedLinkReversed({
    children,
    className="",
    href,
    target = "_self"
}) {
    return (
        <Link
            className={" \
            text-red-500 \
             \
            hover:text-white \
            hover:bg-red-500 \
            ring-1 \
            ring-red-500 \
            duration-300 \
             " + className}
            href={href}
            target={target}
        >
            {children}
        </Link>
    )
}
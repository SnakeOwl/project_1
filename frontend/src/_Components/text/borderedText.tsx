interface Props{
    children: React.ReactNode
    className?: string
}

export function GreenText({children, className}: Props){
    return (
        <div className={"py-1 px-2 border border-green-500 text-green-500 rounded-lg " + className}>
            {children}
        </div>
    )
}


export function RedText({children, className}: Props){
    return (
        <div className={"py-1 px-2 border border-red-500 text-red-500 rounded-lg " + className}>
            {children}
        </div>
    )
}

export function BlueText({children, className}: Props){
    return (
        <div className={"py-1 px-2 border border-blue-500 text-blue-500 rounded-lg " + className}>
            {children}
        </div>
    )
}
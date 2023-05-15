export default function Button({
    className,
    children,
    type,
    onHandleClick,
    title,
}){
    return (
        <button
            className={`bttn ${className}`}
            type={type}
            onClick={onHandleClick}
            title={title}
            >
            {children}
        </button>
    );
}
export function BlueButton(props){
    return (
        <Button
            {...props}
            className={`blue ${props.className}`}
        />
    );
}

export function RedButton(props){
    return (
        <Button
            {...props}
            className={`red ${props.className}`}
        />
    );
}

export function GreenButton(props){
    return (
        <Button
            {...props}
            className={`green ${props.className}`}
        />
    );
}


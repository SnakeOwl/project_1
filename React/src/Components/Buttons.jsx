export function BlueButton({
    className = '',
    children,
    type,
    onHandleClick,
    title,
}){
    return (
        <button
            className={'bttn blue ' + className}
            type={type}
            onClick={onHandleClick}
            title={title}
            >
            {children}
        </button>
    );
}

export function RedButton({
    className = '',
    children,
    type,
    onHandleClick,
    title,
}){
    return (
        <button
            className={'bttn red ' + className}
            type={type}
            onClick={onHandleClick}
            title={title}
            >
            {children}
        </button>
    );
}

export function GreenButton({
    className = '',
    children,
    type,
    onHandleClick,
    title,
}){
    return (
        <button
            className={'bttn green ' + className}
            type={type}
            onClick={onHandleClick}
            title={title}
            >
            {children}
        </button>
    );
}

export default BlueButton;

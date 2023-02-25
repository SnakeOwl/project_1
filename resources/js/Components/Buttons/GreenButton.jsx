export default function({
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

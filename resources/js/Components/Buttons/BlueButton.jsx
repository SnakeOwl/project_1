export default function BlueButton({
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

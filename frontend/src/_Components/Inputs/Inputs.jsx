
//todo: изменить расширение фалйа и подвести функцию под этот интерфейс
/*
interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    id:number
    labelText?: string
    error?: string | undefined 
}
*/

export function Input(props) {
    const classes = "p-3 w-full rounded-md text-inherit bg-inherit \
        border-2 border-gray-150 \
        dark:border-gray-700 \
        focus:border-gray-300 ";

    const errClasses = "text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-b-xl";
    
    return (
        <>
            <label htmlFor={props.id}>{props.labelText}</label>
            <input
                {...props}
                className={classes}
            />
            { props.error!== undefined &&
                <p className={errClasses}>{props.error}</p>
            }
        </>
    )
}


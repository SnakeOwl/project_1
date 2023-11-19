interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string
    label?: string
    error?: string | undefined 
    className?: string
}

export function Textarea({
    id,
    label,
    error,
    className,
    ...other
}: IProps) {
    const classes = "p-3 w-full rounded-md text-inherit bg-inherit \
        border-2 border-gray-150 \
        dark:border-gray-700 \
        focus:border-gray-300 ";

    const errClasses = "text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-b-xl";
        
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <textarea
                {...other}
                className={classes}
                id={id}
            ></textarea>
            { error!== undefined &&
                <p className={errClasses}>{error}</p>
            }
        </div>
    )
}
"use client"
import { useId } from "react"

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?:      string
    label?:     string
    error?:     string | undefined
    className?: string
}


export function Input({
    value,
    label,
    error,
    className,

    ...other
}: IProps) {
    const id = useId();
    const classes = "p-3 w-full rounded-md text-inherit bg-inherit \
        border-2 border-gray-200 \
        dark:border-gray-700 \
        focus:border-gray-300 ";

    const errClasses = "text-red-600 border-red-500 border text-justify py-3 px-2 rounded-b-xl";
    
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                value={value}
                {...other}

                className={classes}
            />
            { error != undefined || error != null &&
                <p className={errClasses}>{error}</p>
            }
        </div>
    )
}


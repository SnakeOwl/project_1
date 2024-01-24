"use client"
import { useId } from 'react';


interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    className?: string
}


export default function Checkbox({
    label,
    className,
    ...other
}: IProps) {
    const id = useId();

    return (
        <div className={`flex gap-2 ${className}`}>
            <input type="checkbox"
                id={id}
                className="
                    relative peer shrink-0
                    appearance-none w-4 h-4 rounded-sm
                    border border-blue-500 dark:border-blue-700
                    mt-1
                    checked:bg-blue-500 dark:checked:bg-blue-700 checked:border-0
                    focus:outline-none focus:ring-offset-0 
                    disabled:border-steel-400 disabled:bg-steel-400
                    bg-inherit
                "

                {...other}
            />
            <label htmlFor={id}>{label}</label>
            <svg
                className="
                    absolute 
                    w-4 h-4 mt-1
                    hidden peer-checked:block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
    )
}
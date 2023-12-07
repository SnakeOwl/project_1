import { ChangeEventHandler } from "react";


interface IProps extends React.InputHTMLAttributes<HTMLInputElement>{
    id?: string
    label: string
    className?: string
}


export default function Checkbox({
    id,
    label,
    className,
    ...other
}: IProps ){

    // todo: Придумать что-то с красивыми чекбоксами
    // clip-0 pointer-events-none after:content-['*'] absolute
    return (
        <div className={className}>
            <input type="checkbox"
                id={id}
                {...other}
                className="mr-2"
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}
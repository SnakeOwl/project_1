"use client"

export function BlueButton(props) {
    return (
        <button
            {...props}
            className={" \
            text-white \
            bg-blue-600 \
            border border-blue-600 \
            hover:bg-inherit \
            hover:text-blue-600 \
            duration-300 \
             " + props.className}>
            {props.children}
        </button>
    )
}

export function BlueButtonReversed(props) {
    return (
        <button
            {...props}
            className={" \
            text-blue-600\
            hover:text-white\
            bg-inherit \
            hover:bg-blue-600 \
            border border-blue-600 \
            duration-300 \
             " + props.className}>
            {props.children}
        </button>
    )
}

export function RedButton(props) {
    return (
        <button
            {...props}
            className={" \
            text-white \
            bg-red-500 \
            hover:bg-inherit \
            borde border-red-500 \
            hover:text-red-500 \
            duration-300 \
             " + props.className}>
            {props.children}
        </button>
    )
}

export function RedButtonReversed(props) {
    return (
        <button
            {...props}
            className={" \
            text-red-500\
            hover:text-white\
            bg-inherit \
            hover:bg-red-500 \
            border border-red-500 \
            duration-300 \
             " + props.className}>
            {props.children}
        </button>
    )
}


export function PurpleButtonReversed(props) {
    return (
        <button
            {...props}
            className={" \
            text-purple-500\
            hover:text-white\
            bg-inherit \
            hover:bg-purple-500 \
            border border-purple-600 \
            duration-300 \
             " + props.className}>
            {props.children}
        </button>
    )
}
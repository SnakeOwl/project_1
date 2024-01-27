import { BlueLink } from "@/_Components/ColoredLinks"
import { memo } from "react"


interface IProps{
    href: string
}

const BigPlusLink = ({href}: IProps) => {
    return (
        <BlueLink
            href={href}
            className="py-2 h-full text-center flex items-center justify-center"
        >
            <i className="bi bi-plus-lg"></i>
        </BlueLink>
    )
}


export default memo(BigPlusLink) 
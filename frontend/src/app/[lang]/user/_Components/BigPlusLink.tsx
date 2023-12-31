import { BlueLink } from "@/_Components/ColoredLinks"
import { memo } from "react"


interface IProps{
    href: string
}

const BigPlusLink = ({href}: IProps) => {
    return (
        <BlueLink
            href={href}
            className="w-full text-center py-16"
        >
            <i className="bi bi-plus-lg"></i>
        </BlueLink>
    )
}


export default memo(BigPlusLink) 
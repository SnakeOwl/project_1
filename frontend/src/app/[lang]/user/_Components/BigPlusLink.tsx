import { BlueLinkReversed } from "@/_Components/ColoredLinks"
import { memo } from "react"


interface IProps{
    href: string
}

const BigPlusLink = ({href}: IProps) => {
    return (
        <BlueLinkReversed
            href={href}
            className="py-2 h-full text-center flex items-center justify-center rounded-lg"
        >
            <i className="bi bi-plus-lg"></i>
        </BlueLinkReversed>
    )
}


export default memo(BigPlusLink) 
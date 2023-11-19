import { RedLink } from "@/Components/Links/ColoredLinks";


export default function BasketButton() {
    return (
        <RedLink
            href="/basket"
            className="mr-2 rounded px-3 py-1"
        >
            <i className="bi bi-cart-fill"></i>
        </RedLink>
    )
}
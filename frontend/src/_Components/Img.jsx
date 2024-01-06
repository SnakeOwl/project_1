import configRoutes from "@/config/API_routes"
import Image from 'next/image'

export default function Img(props) {
    const src = props.src;
    let nsrc = "/images/default_img.jpg";


    if (src !== undefined && src !== null)
        nsrc = `${configRoutes.API_IMAGES_STORAGE}/${src}`;

    return (
        <Image
            width={500}
            height={500}
            {...props}
            src={nsrc}
            alt="Here must be image"
        />
    );
}

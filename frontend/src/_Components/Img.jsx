import configRoutes from "@/config/API_routes"


export default function Img(props) {
    const src = props.src;
    let nsrc = "/images/default_img.jpg"; 
    

    if (src !== undefined && src !== null)
        nsrc = `${configRoutes.API_IMAGES_STORAGE}/${src}`;   


    return (
        <img
            {...props}
            src={nsrc}
        />
    );
}

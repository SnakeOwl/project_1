import configRoutes from "@/config/API_routes"


export default function Img(props) {
    const src = props.src;
    let nsrc = `${configRoutes.API_IMAGES_STORAGE}/`;

    if (src !== undefined && src !== null){
        nsrc += src;
    } else {
        // по этому пути на сервере должна лежать такая картинка
        nsrc += "system/default_img.jpg"; 
    }

    return (
        <img
            {...props}
            src={nsrc}
        />
    );
}

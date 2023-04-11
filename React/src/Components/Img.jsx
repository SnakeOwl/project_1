import NETWORK from "../config/network";

export default function Img({
    className,
    src,
    alt,
}){
    
    src = src? src: NETWORK.APP_DEFAULT_IMAGE;
    return (
        <img className={className} src={src} alt={alt} />
    );
}
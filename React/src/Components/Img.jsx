export default function Img({
    className,
    src,
    alt,
}){
    src = src? src: import.meta.env.VITE_API_BASE_URL + '/storage/system/default_img.jpg';
    
    return (
        <img className={className} src={src} alt={alt} />
    );
}
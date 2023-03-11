export default function Img({
    className="",
    src=false,
    alt,
    width

}){
    src = src? src: "system/default_img.jpg";
    
    return (
        <img
            className={className}
            src={"/storage/"+src}
            alt={alt}
            width={width}
            />
    );
}

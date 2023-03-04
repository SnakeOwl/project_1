export default function Img({
    className="",
    src,
    alt,
    width

}){
    return (
        <img
            className={className}
            src={"/storage/"+src}
            alt={alt}
            width={width}
            />
    );
}

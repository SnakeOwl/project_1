export default function Img({
    className="",
    src,
    alt
}){
    return (
        <img
            className = {className}
            src = {"/storage/"+src}
            alt = {alt}
            />
    );
}

import Img from "/src/Components/Img";

export default function Carousel({
    id="carousel",
    images=null
}){
    if (images == null || images.length == 0){
        images = [
            {url: '/images/system/default_img.jpg'},
            {url: '/images/system/default_img.jpg'},
        ];
    }

    let i = 0;
    const indicators = [];
    const slides = images.map((img)=>{
        indicators.push(
            <button 
                key={`carousel-indicator ${i}`}
                type="button" 
                data-bs-target={`#${id}`} 
                data-bs-slide-to={i} 
                className={(i++ == 0)? "active": "" } 
                aria-current="true"
                ></button>
        );

        return (
            <div 
                key={`${i}`} 
                className={"carousel-item " + (i==1? "active" : '')}
            >
                <Img src={img.url} className="d-block w-100" />
            </div>
        )
    });
    
    return (
        <div id={id} className="carousel carousel-detail-item slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
            {indicators}
        </div>
        <div className="carousel-inner">
            {slides}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={"#"+id} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={"#"+id} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
    );
}
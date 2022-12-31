import Img from "@/Components/Img";
import StandartInput from "@/Components/Inputs/StandartInput";
import RedButton from "@/Components/Buttons/RedButton";

export default function GaleryManager ({
    removeImageHandler,
    images = null,
}){
    let currentImages;
    if (images !== null){
        currentImages = images.map((image, i) => {
            return (
                <div className="col-12 col-md-3">
                    <div className="position-relative">
                        <Img
                            className="w-100"
                            src={image.image}
                        />

                        <RedButton
                            type="button"
                            className="position-absolute top-0 end-0"
                            handleClick={()=>removeImageHandler(i)}
                        >
                            <i class="bi bi-x-lg"></i>
                        </RedButton>
                    </div>
                </div>
            );
        });
    }

    return (
        <>
            <div className="row">
                {currentImages}
            </div>
        </>
    );
}

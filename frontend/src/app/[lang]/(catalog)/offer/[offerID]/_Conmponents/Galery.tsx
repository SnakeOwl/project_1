"use client"

import LightGallery from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import Img from '@/_Components/Img';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import APIroutes from "@/config/API_routes.json";
import IImage from '@/interfaces/IImage';


export default function Galery({
    images
}: {
    images: IImage[]
}) {

    if (images.length === Number(0))
        return (
            <div className='flex items-center justify-center h-full text-3xl'>
                <i className="bi bi-code-slash"></i>
            </div>
        )

    const apiStorage = APIroutes.API_IMAGES_STORAGE;


    return (
        <>
            <LightGallery
                speed={500}
                plugins={[lgZoom]}
                elementClassNames='flex flex-wrap gap-2 justify-around'
            >
                {images.map(image => {
                    const link = `${apiStorage}/${image.url}`;

                    return (
                        <a key={image.id} className='w-full 2xl:w-1/6' href={link}>
                            <Img className='' alt="" src={image.url} />
                        </a>
                    )
                })
                }
            </LightGallery>
        </>
    )
}
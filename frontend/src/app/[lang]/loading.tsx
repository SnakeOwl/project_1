import Image from 'next/image'
import loadingImg from "root/public/images/loader.jpg"


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Image src={loadingImg} alt="loading image" />
    )
  }
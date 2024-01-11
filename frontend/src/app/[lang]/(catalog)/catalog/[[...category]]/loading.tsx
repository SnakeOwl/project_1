import CardWrapper from "@/_Components/CardWrapper";

// filler
export const CardLoader = () => {
    const gradient = "rounded-md bg-gradient-to-br from-green-400 to-green-50 dark:from-blue-900 dark:to-blue-500";

    return (
        <CardWrapper className="2xl:w-1/6 w-full pb-2">
            <div className={`py-32 mb-4 ${gradient}`}></div>
            <div className="px-2">
                <div className={`py-4 mb-2 ${gradient}`}></div>
                <div className={`py-2 mb-2 ${gradient}`}></div>
                <div className={`py-6 ${gradient}`}></div>
            </div>
        </CardWrapper>
    )
}



const ArrayOfCards = function () {
    let result: React.ReactNode[] = [];
    for (let i = 0; i < 15; i++) 
        result.push(<CardLoader key={`item-filler-${i}`} />);

    return result;
}


export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex flex-wrap gap-8">
            {ArrayOfCards()}
        </div>
    )
}
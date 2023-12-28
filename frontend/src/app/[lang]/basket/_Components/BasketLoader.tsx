const Card = () => {
    const gradient = "rounded-md bg-gradient-to-br from-green-400 to-green-50 dark:from-red-950 dark:to-red-500";

    return (
        <div className="w-full 2xl:w-1/6">
            <div className={`py-36 mb-4 ${gradient}`}></div>
            <div className={`py-4 mb-2 ${gradient}`}></div>
            <div className={`py-1 mb-1 ${gradient}`}></div>
            <div className={`py-1 mb-2 ${gradient}`}></div>
            <div className={`py-4 mb-2 ${gradient}`}></div>
        </div>
    )
}



const ArrayOfCards = function () {
    let result: React.ReactNode[] = [];
    for (let i = 0; i < 4; i++) {
        result.push(<Card key={`filler-${i}`} />);
    }


    return result;
}


export default function BasketLoader() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex flex-wrap justify-around gap-4 w-full">
            {ArrayOfCards()}
        </div>
    )
}
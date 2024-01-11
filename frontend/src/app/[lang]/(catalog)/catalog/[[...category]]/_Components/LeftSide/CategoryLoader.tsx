const Card = () => {
    const gradient = "rounded-md bg-gradient-to-r from-green-400 to-green-50 dark:from-blue-950 dark:to-blue-500";

    return (
        <div className={`py-4 ${gradient}`}></div>
    )
}



const ArrayOfCards = function () {
    let result: React.ReactNode[] = [];
    for (let i = 0; i < 8; i++) {
        result.push(<Card key={`category-filler-${i}`} />);
    }


    return result;
}


export default function CategoryLoader() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex flex-col gap-4 w-full">
            {ArrayOfCards()}
        </div>
    )
}
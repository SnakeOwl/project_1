import Categories from "./LeftSide/Categories";
import Searcher from "./LeftSide/Searcher";

export default function LeftSide({
    dictionary
}:{
    dictionary: any
}) {
    return (
        <div className="lx:w-1/6 px-3">
            <Searcher dictionary={dictionary} />

            <Categories dictionary={dictionary} />
        </div>
    )
}
import "server-only"
import RequestList from "./_Components/RequestList";




export default async function OneClickPage({
    params: {page}
}: {params: {page: string}}){

    return (
        <main>
            <RequestList/>
        </main>
    )
}


// metadata. server only!
export async function generateMetadata({
    params: {page}
}: {params: {page: string}}) {
    return {
        title: "Запросы по закупке в один клик",
    }
}
import "server-only"
import RequestList from "./_Components/RequestList";




export default async function OneClickPage({
    params: {page}
}: {params: {page: string}}){

    return (
        <main>
            <h1>Запросы на покупку в один клик</h1>
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
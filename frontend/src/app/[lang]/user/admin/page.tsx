import "server-only"


export default function AdminPage(){
    return (
        <main>
            <h1>Административная панель</h1>
            <p>Тут можно вывести количество записей по их категориям. Ещё каких-либо графиков</p>
        </main>
    )
}




// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Административная панель",
    }
}
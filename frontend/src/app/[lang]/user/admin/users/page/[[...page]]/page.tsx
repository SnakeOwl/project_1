import "server-only"
import UserList from "./_Components/UserList";


export default function UsersPage({
    params: {page}
}: {
    params: { page?: string }
}){

    
    return (
        <main>
            <h1>Управление пользователями</h1>

            <UserList page={page} />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Пользователи"
    }
}
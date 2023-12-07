import "server-only"
import UserList from "./Components/UserList";


interface IProps {
    params: {
        page?: string
    }
}


export default function UsersPage({
    params: {page}
}: IProps){

    
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
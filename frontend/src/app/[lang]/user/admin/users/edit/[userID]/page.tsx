import "server-only"
import UserForm from "./Components/UserForm"


interface IProps {
    params:{
        userID: string
    }
}


export default function UserEditPage({
    params: {userID}
}: IProps){
    return (
        <main>
            <h1>Форма пользователя</h1>

            <UserForm userID={userID} />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata() {
    return {
        title: "Форма пользователя"
    }
}
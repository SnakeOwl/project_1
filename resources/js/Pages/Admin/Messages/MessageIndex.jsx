import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'

export default function MessageIndex(props){
    const messages = [];

    function handleReadClick(messageId){
        Inertia.post( route('message-read', messageId) );
    }

    props.messages.data.forEach((message) => {
        messages.push(
            <tr>
                <td>{message.id}</td>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>
                    <BlueButton handleClick={() => handleReadClick(message.id)}>
                        Прочитано
                    </BlueButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout
            auth={props.auth}
            flash={props.flash}
        >
            <h2>Письма пользователей</h2>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Имя</th>
                    <th>email</th>
                    <th>Сообщение</th>
                </thead>
                <tbody>
                    {messages}
                </tbody>
            </table>
        </AdminLayout>
    );
}

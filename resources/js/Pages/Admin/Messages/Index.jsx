import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import { Inertia } from '@inertiajs/inertia'
import Pagination from '@/Components/Paginations/Pagination';

export default function Index(props){
    const {lang} = props;
    const messages = props.messages.data.map((message)=>{
        return (
            <tr>
                <td>{message.id}</td>
                <td>{message.email}</td>
                <td>{message.message}</td>
                <td>
                    <BlueButton onHandleClick={() => Inertia.delete(route('messages.destroy', message.id))}>
                        Прочитано
                    </BlueButton>
                </td>
            </tr>

        )
    });


    return (
        <AdminLayout title={lang['messages h']}>
            <h1 className="text-center">{lang['messages h']}</h1>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>email</th>
                    <th>Сообщение</th>
                </thead>
                <tbody>
                    {messages}
                </tbody>
            </table>
            <Pagination links={props.messages.links} />
        </AdminLayout>
    );
}

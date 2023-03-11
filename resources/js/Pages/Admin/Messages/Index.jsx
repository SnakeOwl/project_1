import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
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
                    <BlueButton onHandleClick={()=>Inertia.delete(route('messages.destroy', message.id))}>
                        {lang['is read']}
                    </BlueButton>
                </td>
            </tr>

        )
    });


    return (
        <AdminLayout title={lang['messages h']}>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>email</th>
                    <th>{lang["messages h"]}</th>
                </thead>
                <tbody>
                    {messages}
                </tbody>
            </table>

            <Pagination links={props.messages.links} />

        </AdminLayout>
    );
}

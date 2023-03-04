import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import { Inertia } from '@inertiajs/inertia'
import Pagination from '@/Components/Paginations/Pagination';

export default function Index(props){
    const {lang} = props;
    const subscribers = props.subscribers.data.map((subscriber) => {
        return (
            <tr>
                <td>{subscriber.id}</td>
                <td>{subscriber.email}</td>
                <td>{subscriber.status}</td>
                <td>{subscriber.offer_id}</td>
                <td>
                    <RedButton onHandleClick={() => Inertia.delete(route('subscribers.destroy', subscriber))}>
                        <i class="bi bi-x-octagon"></i>
                    </RedButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout title={lang['subscribers h']}>
            <h1 className="text-center">{lang['subscribers h']}</h1>


            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>email</th>
                    <th>status</th>
                    <th>offer Id</th>
                </thead>
                <tbody>
                    {subscribers}
                </tbody>
            </table>

            <Pagination links={props.subscribers.links} />
        </AdminLayout>
    );
}

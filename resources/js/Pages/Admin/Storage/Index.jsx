import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import BlueButton from '@/Components/Buttons/BlueButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'
import Pagination from '@/Components/Paginations/Pagination';

export default function Index(props){
    const {lang} = props;
    const storages = props.storages.data.map((storage) => {
        return(
            <tr>
                <td>
                    <a onClick={()=>Inertia.get(route('storages.show', storage))} href="#">{storage.id}</a>
                </td>
                <td>{storage.address}</td>
                <td>{storage.name}</td>
                <td>{storage.phone}</td>
                <td dangerouslySetInnerHTML={{__html:storage.schedule}} ></td>
                <td>
                    <BlueButton onHandleClick={()=>Inertia.get(route('storages.edit', storage))}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueButton>
                    <RedButton onHandleClick={() => Inertia.delete(route('storages.destroy', storage))}>
                        <i class="bi bi-x-octagon"></i>
                    </RedButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout title={lang['storages']}>

            <BlueButton
                onHandleClick={()=>Inertia.get(route('storages.create'))}
                className="mb-3 w-100 text-center"
            >
                <i class="bi bi-plus-lg"></i>
            </BlueButton>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>{lang['storages name']}</th>
                    <th>{lang['address']}</th>
                    <th>{lang['phone']}</th>
                    <th>{lang['schedule']}</th>
                </thead>
                <tbody>
                    {storages}
                </tbody>
            </table>
            
            <Pagination links={props.storages.links} />

        </AdminLayout>
    );
}

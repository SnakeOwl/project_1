import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout'
import RedButton from '@/Components/Buttons/RedButton'
import BlueButton from '@/Components/Buttons/BlueButton'
import Pagination from '@/Components/Paginations/Pagination'

export default function Index(props){
    const {lang} = props;

    const users = props.users.data.map((user) => {
        return (
            <tr>
                <td>
                    <a
                        onClick={()=> Inertia.get(route('users.show', user))}
                        href="#"
                    >
                        {user.id}
                    </a>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.rights}</td>
                <td>
                    <BlueButton onHandleClick={() => Inertia.get(route('users.edit', user))}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueButton>
                    <RedButton onHandleClick={() => Inertia.delete(route('users.destroy', user))}>
                        <i class="bi bi-x-octagon"></i>
                    </RedButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout title={lang["users"]}>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>{lang['name']}</th>
                    <th>Email</th>
                    <th>{lang['phone']}</th>
                    <th>{lang['right']}</th>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </table>

            <Pagination links={props.users.links} />

        </AdminLayout>
    );
}

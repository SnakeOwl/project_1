import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'

export default function Index(props){
    const users = props.users.data.map((user) => {
        return (
            <tr>
                <td>
                    <a href={route('users.show', user)}> {user.id} </a>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.rights}</td>
                <td>
                    <BlueLink href={route('users.edit', user)}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueLink>
                    <RedButton handleClick={() => Inertia.delete(route('users.destroy', user))}>
                        <i class="bi bi-x-octagon"></i>
                    </RedButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout
            auth={props.auth}
            flash={props.flash}
        >
            <h2>Пользователи</h2>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Права</th>
                    <th>Управление</th>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </table>
        </AdminLayout>
    );
}

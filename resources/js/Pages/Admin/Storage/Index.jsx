import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'

export default function Index(props){
    const storages = props.storages.data.map((storage) => {
        return(
            <tr>
                <td>
                    <a href={route('storages.show', storage)}> {storage.id} </a>
                </td>
                <td>{storage.address}</td>
                <td>{storage.name}</td>
                <td>{storage.phone}</td>
                <td dangerouslySetInnerHTML={{__html:storage.schedule}} ></td>
                <td>
                    <BlueLink href={route('storages.edit', storage)}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueLink>
                    <RedButton handleClick={() => Inertia.delete(route('storages.destroy', storage))}>
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
            <h2>Свойства Точки самовывоза</h2>
            <BlueLink href={route('storages.create')} className="mb-3">Добавить точку самовывоза (хранилище)</BlueLink>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Название</th>
                    <th>Адрес</th>
                    <th>Телефон</th>
                    <th>Расписание</th>
                    <th>Управление</th>
                </thead>
                <tbody>
                    {storages}
                </tbody>
            </table>
        </AdminLayout>
    );
}

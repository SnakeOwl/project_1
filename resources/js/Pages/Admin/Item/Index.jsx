import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'

export default function Index(props){
    const items = props.items.data.map((item) => {
        return(
            <tr>
                <td>
                    <a href={route('items.show', item)}> {item.id} </a>
                </td>
                <td>{item.name}</td>
                <td>
                    <BlueLink href={route("items.skus.index", item)}>
                        Товарные предложения
                    </BlueLink>
                </td>
                <td>{item.skus.length}</td>
                <td>
                    <BlueLink href={route('items.edit', item)}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueLink>
                    <RedButton handleClick={() => Inertia.delete(route('items.destroy', item))}>
                        <i class="bi bi-x"></i>
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
            <h2>Товары</h2>
            <BlueLink href={route('items.create')} className="mb-3">Добавить товар</BlueLink>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Название</th>
                    <th>Товарные предложения</th>
                    <th>Количество товарных предложений</th>
                    <th>Управление</th>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </AdminLayout>
    );
}

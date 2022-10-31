import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'

export default function Index(props){
    const item = props.item;

    const skus = props.skus.data.map((sku) => {
        return(
            <tr>
                <td>
                    <a href={route('items.skus.show', [item, sku])}> {sku.id} </a>
                </td>
                <td>{sku.count}</td>
                <td>{sku.price}</td>
                <td>
                    <BlueLink href={route('items.skus.edit', [item, sku])}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueLink>
                    <RedButton handleClick={() => Inertia.delete(route('items.skus.destroy', [item, sku]))}>
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
            <h2>Свойства торговых предложений (item id: {item.id})</h2>
            <BlueLink href={route('items.skus.create', item)} className="mb-3">Добавить торговое предложение</BlueLink>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Количество ТП</th>
                    <th>Цена</th>
                    <th>Управление</th>
                </thead>
                <tbody>
                    {skus}
                </tbody>
            </table>
        </AdminLayout>
    );
}

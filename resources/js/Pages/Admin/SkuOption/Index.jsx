import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'

export default function Index(props){
    const skuOptions = props.properties.data.map((skuProperty) => {
        return (
            <tr>
                <td>
                    <a href={route('sku-properties.show', skuProperty)}> {skuProperty.id} </a>
                </td>
                <td>{skuProperty.name}</td>
                <td>{skuProperty.name_en}</td>
                <td>
                    <BlueLink href={route('sku-properties.property-options.index', skuProperty)}>
                        Варианты свойств
                    </BlueLink>
                </td>
                <td>
                    <BlueLink href={route('sku-properties.edit', skuProperty)}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueLink>
                    <RedButton handleClick={() => Inertia.delete(route('sku-properties.destroy', skuProperty))}>
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
            <h2>Свойства торговых предложений</h2>
            <BlueLink href={route('sku-properties.create')} className="mb-3">Добавить свойство</BlueLink>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Название</th>
                    <th>Название (eng)</th>
                    <th>Варианты свойств</th>
                    <th>Управление</th>
                </thead>
                <tbody>
                    {skuOptions}
                </tbody>
            </table>
        </AdminLayout>
    );
}

import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import RedButton from '@/Components/Buttons/RedButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'

export default function Index(props){
    const skuProperty = props.sku_property;
    const propertyOptions = [];

    function handleDeleteClick(optionId){
        Inertia.delete( route('sku-properties.property-options.destroy', [skuProperty, optionId]) );
    }

    props.skuPropertyOptions.data.forEach((option) => {
        propertyOptions.push(
            <tr>
                <td>
                    <a href={route('sku-properties.property-options.show', [skuProperty, option])}> {option.id} </a>
                </td>
                <td>{option.name}</td>
                <td>{option.name_en}</td>
                <td>
                    <BlueLink href={route('sku-properties.property-options.edit', [skuProperty, option])}>
                            <i class="bi bi-gear-fill"></i>
                    </BlueLink>
                    <RedButton handleClick={() => handleDeleteClick(option.id)}>
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
            <h2>Варианты свойств торговых предложений</h2>
            <BlueLink href={route('sku-properties.property-options.create', skuProperty)} className="mb-3">Добавить вариант</BlueLink>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Название</th>
                    <th>Название (eng)</th>
                    <th>Управление</th>
                </thead>
                <tbody>
                    {propertyOptions}
                </tbody>
            </table>
        </AdminLayout>
    );
}

import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'

export default function Index(props){
    const categories = props.categories.data.map((category) => {
        return (
            <tr>
                <td>
                    <a href={route('item-categories.show', category)}> {category.id} </a>
                </td>
                <td>{category.name}</td>
                <td>{category.name_en}</td>
                <td>
                    <BlueLink href={route('item-categories.edit', category)}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueLink>
                    <RedButton handleClick={() => Inertia.delete(route('item-categories.destroy', category))}>
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
            <h2>Категории товаров</h2>
            <BlueLink href={route('item-categories.create')} className="mb-3">Добавить категорию</BlueLink>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>Название</th>
                    <th>Название (eng)</th>
                    <th>Управление</th>
                </thead>
                <tbody>
                    {categories}
                </tbody>
            </table>
        </AdminLayout>
    );
}

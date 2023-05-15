import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout'
import {RedButton, BlueButton} from '@/Components/Buttons'

export default function Index(props){
    const {lang} = props;
    const categories = props.categories.data.map((category) => {
        return (
            <tr>
                <td>
                    <a href={route('categories.show', category)}> {category.id} </a>
                </td>
                <td>{category.name}</td>
                <td>{category.name_en}</td>
                <td>{category.alias}</td>
                <td>
                    <BlueButton onHandleClick={()=>Inertia.get(route('categories.edit', category))}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueButton>
                    <RedButton onHandleClick={() => Inertia.delete(route('categories.destroy', category))}>
                        <i class="bi bi-x-octagon"></i>
                    </RedButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout title={lang['categories']}>
            <BlueButton
                onHandleClick={()=>Inertia.get(route('categories.create'))}
                className="mb-3 w-100 text-center"
            >
                <i class="bi bi-plus-lg"></i>
            </BlueButton>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>{lang["category field name"]}</th>
                    <th>{lang["category field name en"]}</th>
                    <th>{lang["category field alias"]}</th>
                    <th>{lang["management"]}</th>
                </thead>
                <tbody>
                    {categories}
                </tbody>
            </table>
        </AdminLayout>
    );
}

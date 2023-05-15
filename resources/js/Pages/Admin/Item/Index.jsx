import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout'
import {RedButton, BlueButton} from '@/Components/Buttons'
import Pagination from '@/Components/Paginations/Pagination'

export default function Index(props){
    const {lang} = props;
    const items = props.items.data.map((item) => {
        return(
            <tr>
                <td>
                    <a href={route('items.show', item)}> {item.id} </a>
                </td>
                <td>{item.name}</td>
                <td>
                    <BlueButton onHandleClick={()=>Inertia.get(route('items.offers.index', item))}>
                        Товарные предложения
                    </BlueButton>
                </td>
                <td>{item.offers.length}</td>
                <td>
                    <BlueButton onHandleClick={()=>Inertia.get(route('items.edit', item))}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueButton>
                    <RedButton onHandleClick={()=>Inertia.delete(route('items.destroy', item))}>
                        <i class="bi bi-x"></i>
                    </RedButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout title={lang["goods"]}>
            <BlueButton
                onHandleClick={()=>Inertia.get(route('items.create'))}
                className="mb-3 w-100 text-center"
            >
                <i class="bi bi-plus-lg"></i>
            </BlueButton>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>{lang["name"]}</th>
                    <th>{lang["offers"]}</th>

                    <th>{lang["count offers"]}</th>
                    <th>{lang["management"]}</th>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>

            <Pagination links={props.items.links} />
        </AdminLayout>
    );
}

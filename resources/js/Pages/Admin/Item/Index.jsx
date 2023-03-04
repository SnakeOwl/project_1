import { Inertia } from '@inertiajs/inertia';
import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton';
import BlueLink from '@/Components/Links/BlueLink';
import Pagination from '@/Components/Paginations/Pagination';

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
                    <BlueLink href={route("items.offers.index", item)}>
                        Товарные предложения
                    </BlueLink>
                </td>
                <td>{item.offers.length}</td>
                <td>
                    <BlueLink href={route('items.edit', item)}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueLink>
                    <RedButton onHandleClick={() => Inertia.delete(route('items.destroy', item))}>
                        <i class="bi bi-x"></i>
                    </RedButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout>
            <h2>{lang["items management"]}</h2>
            <BlueLink
                href={route('items.create')}
                className="mb-3 w-100 text-center"
            >
                <i class="bi bi-plus-lg"></i>
            </BlueLink>

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

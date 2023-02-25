import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import BlueLink from '@/Components/Links/BlueLink'
import { Inertia } from '@inertiajs/inertia'

export default function Index(props){
    const {item, lang} = props;

    const offers = props.offers.data.map((offer) => {
        return(
            <tr>
                <td>
                    <a href={route('items.offers.show', [item, offer])}> {offer.id} </a>
                </td>
                <td>{offer.count}</td>
                <td>{offer.price}</td>
                <td>
                    <BlueLink href={route('items.offers.edit', [item, offer])}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueLink>
                    <RedButton onHandleClick={() => Inertia.delete(route('items.offers.destroy', [item, offer]))}>
                        <i class="bi bi-x"></i>
                    </RedButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout>
            <h2>{lang["offers for item"]}: (Item id: {item.id})</h2>
            <BlueLink
                href={route('items.offers.create', item)}
                className="mb-3 w-100 text-center"
            >
                    <i class="bi bi-plus-lg"></i>
            </BlueLink>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>{lang["count"]}</th>
                    <th>{lang["price"]}</th>
                    <th>{lang["management"]}</th>
                </thead>
                <tbody>
                    {offers}
                </tbody>
            </table>
        </AdminLayout>
    );
}

import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout';
import RedButton from '@/Components/Buttons/RedButton'
import BlueButton from '@/Components/Buttons/BlueButton'

export default function Index(props){
    const {item, lang} = props;

    const offers = props.offers.data.map((offer) => {
        return(
            <tr>
                <td>
                    <a
                        onClick={()=>Inertia.get(route('items.offers.show', [item, offer]))}
                        href="#"
                    >
                        {offer.id}
                    </a>
                </td>
                <td>{offer.count}</td>
                <td>{offer.price}</td>
                <td>
                    <BlueButton onHandleClick={()=>Inertia.get(route('items.offers.edit', [item, offer]))}>
                        <i class="bi bi-gear-fill"></i>
                    </BlueButton>
                    <RedButton onHandleClick={()=>Inertia.delete(route('items.offers.destroy', [item, offer]))}>
                        <i class="bi bi-x"></i>
                    </RedButton>
                </td>
            </tr>
        );
    });

    return (
        <AdminLayout title={lang["offers for item"] +" (Item id:"+ item.id +")"}>

            <BlueButton
                onHandleClick={()=>Inertia.get(route('items.offers.create', item))}
                className="mb-3 w-100 text-center"
            >
                    <i class="bi bi-plus-lg"></i>
            </BlueButton>

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

import { Inertia } from '@inertiajs/inertia'
import AdminLayout from '@/Layouts/AdminLayout'
import {RedButton} from '@/Components/Buttons'
import Pagination from '@/Components/Paginations/Pagination'

export default function Index(props){
    const {lang} = props;
    const forms = props.forms.data.map((form)=>{
        return (
            <tr>
                <td>{form.id}</td>
                <td>{form.phone}</td>
                <td>{form.name}</td>
                <td>
                    <RedButton onHandleClick={()=>Inertia.delete(route('oneClickForm.destroy', form))}>
                        <i class="bi bi-x"></i>
                    </RedButton>
                </td>
            </tr>
        )
    });


    return (
        <AdminLayout title={lang['one click form h']}>

            <table className="table table-striped">
                <thead>
                    <th>#</th>
                    <th>{lang["phone"]}</th>
                    <th>{lang["name"]}</th>
                </thead>
                <tbody>
                    {forms}
                </tbody>
            </table>

            <Pagination links={props.forms.links} />

        </AdminLayout>
    );
}

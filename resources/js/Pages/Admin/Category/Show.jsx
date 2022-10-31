import AdminLayout from '@/Layouts/AdminLayout';

export default function Show(props){
    const category = props.item_category;
    const fields = [];

    for (let field in category){
         fields.push(
             <tr>
                 <td>{field}:</td>
                 <td>{category[field]}</td>
             </tr>
         );
    }

    return (
        <AdminLayout
            auth={props.auth}
        >
            <h3>Просмотр категории</h3>
            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>
        </AdminLayout>
    );
}

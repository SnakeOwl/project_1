import AdminLayout from '@/Layouts/AdminLayout';

export default function Show(props){
    const sku = props.sku;
    const fields = [];

    for (let field in sku){
         fields.push(
             <tr>
                 <td>{field}:</td>
                 <td dangerouslySetInnerHTML={{__html:sku[field]}}></td>
             </tr>
         );
    }

    return (
        <AdminLayout
            auth={props.auth}
        >
            <h3>Просмотр торгового предложения (id: {sku.id})</h3>
            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>
        </AdminLayout>
    );
}

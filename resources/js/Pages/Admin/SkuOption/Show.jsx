import AdminLayout from '@/Layouts/AdminLayout';

export default function Show(props){
    const property = props.sku_property;
    const fields = [];

    for (let field in property){
         fields.push(
             <tr>
                 <td>{field}:</td>
                 <td>{property[field]}</td>
             </tr>
         );
    }

    return (
        <AdminLayout
            auth={props.auth}
        >
            <h3>Поля Свойства торговых предложений</h3>
            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>
        </AdminLayout>
    );
}

import AdminLayout from '@/Layouts/AdminLayout';

export default function Show(props){
    const option = props.property_option;
    const fields = [];

    for (let field in option){
         fields.push(
             <tr>
                 <td>{field}:</td>
                 <td>{option[field]}</td>
             </tr>
         );
    }

    return (
        <AdminLayout
            auth={props.auth}
        >
            <h3>Просмотр варианта свойства торговых предложений</h3>
            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>
        </AdminLayout>
    );
}

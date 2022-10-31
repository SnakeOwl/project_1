import AdminLayout from '@/Layouts/AdminLayout';

export default function Show(props){
    const user = props.user;
    const fields = [];

    for (let field in user){
         fields.push(
             <tr>
                 <td>{field}:</td>
                 <td>{user[field]}</td>
             </tr>
         );
    }

    return (
        <AdminLayout
            auth={props.auth}
        >
            <h3>Просмотр пользователя</h3>
            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>
        </AdminLayout>
    );
}

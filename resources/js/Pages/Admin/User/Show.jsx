import AdminLayout from '@/Layouts/AdminLayout';

export default function Show(props){
    const {user, lang} = props;
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
        <AdminLayout title={lang['user show']}>

            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>

        </AdminLayout>
    );
}

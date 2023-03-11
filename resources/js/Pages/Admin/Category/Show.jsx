import AdminLayout from '@/Layouts/AdminLayout';

export default function Show(props){
    const {lang, category} = props;
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
        <AdminLayout title={lang['category show']}>

            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>

        </AdminLayout>
    );
}

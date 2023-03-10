import AdminLayout from '@/Layouts/AdminLayout';

export default function Show(props){
    const storage = props.storage;
    const fields = [];

    for (let field in storage){
         fields.push(
             <tr>
                 <td>{field}:</td>
                 <td dangerouslySetInnerHTML={{__html:storage[field]}}></td>
             </tr>
         );
    }

    return (
        <AdminLayout title={lang['storage show']}>

            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>
            
        </AdminLayout>
    );
}

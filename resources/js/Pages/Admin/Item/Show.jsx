import AdminLayout from '@/Layouts/AdminLayout'

export default function Show(props){
    const {item, lang} = props;
    const fields = [];

    for (let field in item){
         fields.push(
             <tr>
                 <td>{field}:</td>
                 <td dangerouslySetInnerHTML={{__html:item[field]}}></td>
             </tr>
         );
    }

    return (
        <AdminLayout title={lang['item show']}>

            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>

        </AdminLayout>
    );
}

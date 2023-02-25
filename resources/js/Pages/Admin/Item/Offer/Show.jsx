import AdminLayout from '@/Layouts/AdminLayout';

export default function Show(props){
    const {offer} = props;
    const fields = [];

    for (let field in offer){
         fields.push(
             <tr>
                 <td>{field}:</td>
                 <td dangerouslySetInnerHTML={{__html:offer[field]}}></td>
             </tr>
         );
    }

    return (
        <AdminLayout>
            <h3>{lang['offer show h']} #: {offer.id}</h3>
            <table className="table table-striped">
                <tbody>
                    {fields}
                </tbody>
            </table>
        </AdminLayout>
    );
}

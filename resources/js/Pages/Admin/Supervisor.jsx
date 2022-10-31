import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Supervisor(props){
    return (
        <AdminLayout
            auth={props.auth}
        >
        <p className="text-danger">тут можно вывести графики</p>


        </AdminLayout>
    );
}

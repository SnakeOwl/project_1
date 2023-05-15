import AdminLayout from '@/Layouts/AdminLayout';
import {BlueButton} from '@/Components/Buttons'
import FloatInput from '@/Components/Inputs/FloatInput'
import FloatTextarea from '@/Components/Inputs/FloatTextarea'
import { useForm } from '@inertiajs/inertia-react';

export default function Form(props){
    const {lang} = props;
    const storage = props.storage? props.storage: null;
    const { data, setData, post, patch, errors, reset } = useForm({
        address:    storage? storage.address : "",
        address_en:    storage? storage.address_en : "",
        name:       storage? storage.name: "",
        name_en:       storage? storage.name_en: "",
        phone:      storage? storage.phone: "",
        schedule:   storage? storage.schedule: "",
        schedule_en:   storage? storage.schedule_en: "",
    });

    function onHandleSubmit(e){
        e.preventDefault();
        if (storage == null)
            post(route('storages.store'));
        else
            patch(route('storages.update', storage));
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <AdminLayout title={lang['storage h']}>
        
            <div className="col-12 col-xxl-4 mx-auto">
                <form onSubmit={onHandleSubmit}>
                    <FloatInput
                        id="address"
                        value={data.address}
                        className="mb-3"
                        labelText={lang['address']}
                        onHandleChange={onHandleChange}
                        isFocused={true}
                        required
                    />
                    <FloatInput
                        id="address_en"
                        value={data.address_en}
                        className="mb-3"
                        labelText={`${lang['address']}(eng)`}
                        onHandleChange={onHandleChange}
                        isFocused={true}
                        required
                    />

                    <FloatInput
                        id="name"
                        value={data.name}
                        className="mb-3"
                        labelText={lang['storages name']}
                        onHandleChange={onHandleChange}
                        required
                    />

                    <FloatInput
                        id="name_en"
                        value={data.name_en}
                        className="mb-3"
                        labelText={`${lang['storages name']} (eng)`}
                        onHandleChange={onHandleChange}
                        required
                    />

                    <FloatInput
                        id="phone"
                        value={data.phone}
                        className="mb-3"
                        labelText={lang['phone']}
                        onHandleChange={onHandleChange}
                        required
                    />

                    <FloatTextarea
                        id="schedule"
                        value={data.schedule}
                        className="mb-3"
                        labelText={lang['schedule']}
                        rows="3"
                        onHandleChange={onHandleChange}
                        required
                    />

                    <FloatTextarea
                        id="schedule_en"
                        value={data.schedule_en}
                        className="mb-3"
                        labelText={`${lang['schedule']} (eng)`}
                        rows="3"
                        onHandleChange={onHandleChange}
                        required
                    />

                    <BlueButton className="w-100">{lang['submit']}</BlueButton>
                </form>
            </div>
            
        </AdminLayout>
    );
}

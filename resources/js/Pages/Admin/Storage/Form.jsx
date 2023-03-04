import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import FloatInput from '@/Components/Inputs/FloatInput'
import FloatTextarea from '@/Components/Inputs/FloatTextarea'
import { useForm } from '@inertiajs/inertia-react';

export default function Form(props){
    const {lang} = props;
    const storage = props.storage? props.storage: null;
    const { data, setData, post, patch, errors, reset } = useForm({
        address:    storage? storage.address : "",
        name:       storage? storage.name: "",
        phone:      storage? storage.phone: "",
        schedule:   storage? storage.schedule: "",
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
        <AdminLayout>
            <div className="col-12 col-xxl-4 mx-auto">
                <h1 className="text-center">{lang['storage h']}</h1>
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
                        id="name"
                        value={data.name}
                        className="mb-3"
                        labelText={lang['storages name']}
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

                    <BlueButton className="w-100">{lang['submit']}</BlueButton>
                </form>
            </div>
        </AdminLayout>
    );
}

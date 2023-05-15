import AdminLayout from '@/Layouts/AdminLayout';
import {BlueButton} from '@/Components/Buttons'
import FloatInput from '@/Components/Inputs/FloatInput'
import { useForm } from '@inertiajs/inertia-react';

export default function Form(props){
    const {lang, user} = props;
    const { data, setData, post, patch, errors, reset } = useForm({
        name:   user? user.name : "",
        email:  user? user.email: "",
        phone:  user? user.phone: "",
        rights: user? user.rights: "",
        password: "",
    });


    function handleSubmit(e){
        e.preventDefault();

        patch(route('users.update', user));
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return (
        <AdminLayout title={lang['user form']}>
            <form className="col-12 col-lg-3 mx-auto" onSubmit={handleSubmit}>
                <FloatInput
                    id="name"
                    value={data.name}
                    labelText="Название"
                    className="mb-3"
                    onHandleChange={onHandleChange}
                    isFocused={true}
                    required
                />

                <FloatInput
                    id="email"
                    type="email"
                    value={data.email}
                    labelText="Email"
                    className="mb-3"
                    onHandleChange={onHandleChange}
                    required
                />

                <FloatInput
                    id="phone"
                    type="tel"
                    value={data.phone}
                    labelText="Телефон"
                    className="mb-3"
                    onHandleChange={onHandleChange}
                />

                <FloatInput
                    id="rights"
                    type="number"
                    max="10"
                    value={data.rights}
                    labelText={lang['right']}
                    className="mb-3"
                    onHandleChange={onHandleChange}
                    required
                />

                <FloatInput
                    id="password"
                    type="password"
                    className="mb-3"
                    value={data.password}
                    labelText={lang['new password field']}
                    onHandleChange={onHandleChange}
                    maxlenght="32"
                />

                <BlueButton className="w-100">{lang['submit']}</BlueButton>
            </form>
        </AdminLayout>
    );
}

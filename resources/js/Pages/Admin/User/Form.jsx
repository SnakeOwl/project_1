import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import StandartInput from '@/Components/Inputs/StandartInput'
import StandartTextarea from '@/Components/Inputs/StandartTextarea'
import { useForm } from '@inertiajs/inertia-react';

export default function Form(props){
    const user = props.user? props.user: null;
    const { data, setData, post, patch, errors, reset } = useForm({
        name:   user? user.name : "",
        email:  user? user.email: "",
        phone:  user? user.phone: "",
        rights: user? user.rights: "",
        password: "",
    });


    function handleSubmit(e){
        e.preventDefault();

        if (user == null){
            post(route('users.store'));
        }else{
            patch(route('users.update', user));
        }
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return (
        <AdminLayout
            auth={props.auth}
            flash={props.flash}
        >
            <h3>Форма Пользователя</h3>
            <form className="col-12 col-lg-3 mb-3" onSubmit={handleSubmit}>
                <StandartInput
                    id="name"
                    value={data.name}
                    labelText="Название"
                    handleChange={onHandleChange}
                    errors={errors}
                    isFocused={true}
                    required
                />

                <StandartInput
                    id="email"
                    type="email"
                    value={data.email}
                    labelText="Email"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <StandartInput
                    id="phone"
                    type="tel"
                    value={data.phone}
                    labelText="Телефон"
                    handleChange={onHandleChange}
                    errors={errors}
                />

                <StandartInput
                    id="rights"
                    type="number"
                    max="10"
                    value={data.rights}
                    labelText="Права"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <StandartInput
                    id="password"
                    type="password"
                    value={data.password}
                    labelText="Новый пароль (вводить при необходимости)"
                    handleChange={onHandleChange}
                    errors={errors}
                    maxlenght="32"
                />

                <BlueButton>Сохранить</BlueButton>
            </form>
        </AdminLayout>
    );
}

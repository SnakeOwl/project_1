import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import StandartInput from '@/Components/Inputs/StandartInput'
import StandartTextarea from '@/Components/Inputs/StandartTextarea'
import { useForm } from '@inertiajs/inertia-react';

export default function Form(props){
    const storage = props.storage? props.storage: null;
    const { data, setData, post, patch, errors, reset } = useForm({
        address:    storage? storage.address : "",
        name:       storage? storage.name: "",
        phone:      storage? storage.phone: "",
        schedule:   storage? storage.schedule: "",
    });

    function handleSubmit(e){
        e.preventDefault();
        if (storage == null){
            post(route('storages.store'));
        }else{
            patch(route('storages.update', storage));
        }

        e.target.reset();
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return (
        <AdminLayout
            auth={props.auth}
            flash={props.flash}
        >
            <h3>Форма Точки самовывоза</h3>
            <form className="col-12 col-lg-3 mb-3" onSubmit={handleSubmit}>
                <StandartInput
                    id="address"
                    value={data.address}
                    labelText="Адрес"
                    handleChange={onHandleChange}
                    errors={errors}
                    isFocused={true}
                    required
                />

                <StandartInput
                    id="name"
                    value={data.name}
                    labelText="Название"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <StandartInput
                    id="phone"
                    value={data.phone}
                    labelText="Телефон"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />



                <StandartTextarea
                    id="schedule"
                    value={data.schedule}
                    labelText="Расписание"
                    rows="3"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <BlueButton>Сохранить</BlueButton>
            </form>
        </AdminLayout>
    );
}

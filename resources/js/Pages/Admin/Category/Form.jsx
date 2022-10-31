import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import StandartInput from '@/Components/Inputs/StandartInput'
import StandartTextarea from '@/Components/Inputs/StandartTextarea'
import { useForm } from '@inertiajs/inertia-react';

export default function Form(props){
    const category = props.item_category? props.item_category: null;
    const { data, setData, post, patch, errors, reset } = useForm({
        name:    category? category.name : "",
        name_en: category? category.name_en: "",
        alias:   category? category.alias: "",
    });

    function handleSubmit(e){
        e.preventDefault();

        if (category == null){
            post(route('item-categories.store'));
        }else{
            patch(route('item-categories.update', category));
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
            <h3>Поля категории</h3>
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
                    id="name_en"
                    value={data.name_en}
                    labelText="Название на английском"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <StandartInput
                    id="alias"
                    value={data.alias}
                    labelText="Алиас (для ссылок)"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <BlueButton>Сохранить</BlueButton>
            </form>
        </AdminLayout>
    );
}

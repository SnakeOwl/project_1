import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import StandartInput from '@/Components/Inputs/StandartInput'
import { useForm } from '@inertiajs/inertia-react';

export default function Form(props){
    const skuProperty = props.sku_property;
    const option = props.property_option? props.property_option: null;
    const { data, setData, post, patch, errors, reset } = useForm({
        name:       option? option.name : "",
        name_en:    option? option.name_en: "",
    });

    function handleSubmit(e){
        e.preventDefault();
        if (option == null){
            post(route('sku-properties.property-options.store', skuProperty));
        }else{
            patch(route('sku-properties.property-options.update', [skuProperty, option]));
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
            <h3>Форма варианта свойства (id: {skuProperty.id})</h3>
            <form className="col-12 col-lg-3 mb-3" onSubmit={handleSubmit}>
                <StandartInput
                    id="name"
                    value={data.name}
                    labelText="Название"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />
                <StandartInput
                    id="name_en"
                    value={data.name_en}
                    labelText="Название (eng)"
                    handleChange={onHandleChange}
                    errors={errors}
                    required
                />

                <BlueButton>Сохранить</BlueButton>
            </form>
        </AdminLayout>
    );
}

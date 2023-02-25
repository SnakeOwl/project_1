import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import StandartInput from '@/Components/Inputs/StandartInput'
import StandartTextarea from '@/Components/Inputs/StandartTextarea'
import { useForm} from '@inertiajs/inertia-react';

export default function Create(props){
    const {lang} = props;
    const { data, setData, post, patch, errors, reset } = useForm({
        name:    "",
        name_en: "",
        alias:   "",
    });

    function onHandleSubmit(e){
        e.preventDefault();

        post(route('categories.store'));
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return (
        <AdminLayout>
            <div className="col-12 col-xxl-3 mx-auto">
                <h3>{lang["category creating"]}</h3>
                <form  onSubmit={onHandleSubmit}>
                    <StandartInput
                        id="name"
                        value={data.name}
                        labelText={lang['category field name']}
                        onHandleChange={onHandleChange}
                        errors={errors}
                        isFocused={true}
                        required />

                    <StandartInput
                        id="name_en"
                        value={data.name_en}
                        labelText={lang['category field name en']}
                        onHandleChange={onHandleChange}
                        errors={errors}
                        required />

                    <StandartInput
                        id="alias"
                        value={data.alias}
                        labelText={lang['category field alias']}
                        onHandleChange={onHandleChange}
                        errors={errors}
                        required />

                    <BlueButton className="w-100">{lang['submit']}</BlueButton>
                </form>
            </div>
        </AdminLayout>
    );
}

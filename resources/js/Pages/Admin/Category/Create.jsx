import AdminLayout from '@/Layouts/AdminLayout';
import BlueButton from '@/Components/Buttons/BlueButton'
import FloatInput from '@/Components/Inputs/FloatInput'
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
        <AdminLayout title={lang["category creating"]}>
            <div className="col-12 col-lg-3 mx-auto">
                <form  onSubmit={onHandleSubmit}>
                    <FloatInput
                        id="name"
                        value={data.name}
                        className="mb-1"
                        labelText={lang['category field name']}
                        onHandleChange={onHandleChange}
                        errors={errors}
                        isFocused={true}
                        required />

                    <FloatInput
                        id="name_en"
                        value={data.name_en}
                        className="mb-3"
                        labelText={lang['category field name en']}
                        onHandleChange={onHandleChange}
                        errors={errors}
                        required />

                    <FloatInput
                        id="alias"
                        value={data.alias}
                        className="mb-3"
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

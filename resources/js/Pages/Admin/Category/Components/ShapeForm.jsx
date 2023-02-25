import { usePage, useForm } from '@inertiajs/inertia-react';
import FloatInput from '@/Components/Inputs/FloatInput';
import Checkbox from '@/Components/Inputs/Checkbox';
import BlueButton from '@/Components/Buttons/BlueButton';

export default function ShapeForm({category, shape=null }){
    const {lang} = usePage().props;
    const {data, setData, post, patch} = useForm({
        category_id : category.id,
        name :      shape? shape.name: "",
        name_en :   shape? shape.name_en: "",
        global :    shape? shape.global: 0
    });

    const onHandleChange = (event)=>{
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const onHandleSubmit = (event)=>{
        event.preventDefault();

        if (shape)
            patch( route('shapes.update', shape) );
        else
            post( route('shapes.store') );
    }

    return (
        <div className="card-body">
            <form onSubmit={onHandleSubmit}>
                <FloatInput
                    id="name"
                    className="mb-3"
                    value={data.name}
                    labelText={lang['shape field name']}
                    onHandleChange={onHandleChange}
                    required />

                <FloatInput
                    id="name_en"
                    className="mb-3"
                    value={data.name_en}
                    labelText={lang['shape field name en']}
                    onHandleChange={onHandleChange}
                    required />

                <Checkbox
                    id="global"
                    labelText={lang['shape field global']}
                    value={data.global}
                    onHandleChange={onHandleChange}
                    checked={data.global && "checked"} />

                <BlueButton className="w-100">{lang['submit']}</BlueButton>
            </form>
        </div>
    );
}

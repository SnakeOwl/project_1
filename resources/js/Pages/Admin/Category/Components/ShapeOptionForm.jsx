import { usePage, useForm } from '@inertiajs/inertia-react';
import FloatInput from '@/Components/Inputs/FloatInput';
import {BlueButton} from '@/Components/Buttons';

export default function ShapeOptionForm({
    shape,
    option=null,
    pastSubmit=()=>{return false;}
}){
    const {lang} = usePage().props;
    const {data, setData, post, patch} = useForm({
        shape_id:   shape.id,
        value :     option.value? option.value: "",
        value_en :  option.value_en? option.value_en: "",
    });

    const onHandleChange = (event)=>{
        setData(event.target.name, event.target.value);
    }

    const onHandleSubmit = (event)=>{
        event.preventDefault();

        if (option)
            patch( route('shape-options.update', option) );
        else
            post( route('shape-options.store') );

        pastSubmit();
    }

    return (
        <div className="card-body">
            <form onSubmit={onHandleSubmit}>
                <FloatInput
                    id="value"
                    className="mb-3"
                    value={data.value}
                    labelText={lang['option field value']}
                    onHandleChange={onHandleChange}
                    required />

                <FloatInput
                    id="value_en"
                    className="mb-3"
                    value={data.value_en}
                    labelText={lang['option field value en']}
                    onHandleChange={onHandleChange}
                    required />


                <BlueButton className="w-100">{lang['submit']}</BlueButton>
            </form>
        </div>
    );
}

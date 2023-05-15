import {useState} from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import FloatInput from '@/Components/Inputs/FloatInput'
import { useForm} from '@inertiajs/inertia-react';
import ShapeBlock from './Components/ShapeBlock';
import ShapeForm from './Components/ShapeForm';
import { BlueButton } from '@/Components/Buttons';

export default function Edit(props){
    const [createShape, setCreateShape] = useState(false);
    const {lang, category} = props;
    const { data, setData, post, patch, errors, reset } = useForm({
        name:    category.name,
        name_en: category.name_en,
        alias:   category.alias,
    });


    const shapes = category.shapes.map( (shape) =>{
        return <ShapeBlock
            className="col-12 col-xxl-3 px-3 mb-3"
            category={category}
            shape={shape} />
    });

    function onHandleSubmit(e){
        e.preventDefault();

        patch(route('categories.update', category));
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return (
        <AdminLayout title={lang["category management"]}>
            <div className="row">
                {/* форма с категорией*/}
                <div className="col-12 col-lg-3 px-3 mb-3">
                    <form  onSubmit={onHandleSubmit}>
                        <FloatInput
                            id="name"
                            value={data.name}
                            className="mb-2"
                            labelText={lang['category field name']}
                            onHandleChange={onHandleChange}
                            errors={errors}
                            isFocused={true}
                            required />

                        <FloatInput
                            id="name_en"
                            value={data.name_en}
                            className="mb-2"
                            labelText={lang['category field name en']}
                            onHandleChange={onHandleChange}
                            errors={errors}
                            required />

                        <FloatInput
                            id="alias"
                            value={data.alias}
                            className="mb-2"
                            labelText={lang['category field alias']}
                            onHandleChange={onHandleChange}
                            errors={errors}
                            required />

                        <BlueButton className="w-100">{lang['change']}</BlueButton>
                    </form>
                </div>

                {/*Далее пошли формы с шейпами*/}
                {shapes}

                {createShape &&
                    <div className="col-12 col-lg-3 px-3 mb-3">
                        <div className="card h-100">
                            <ShapeForm category={category}/>
                            <div className="card-footer">
                                <BlueButton
                                    className="w-100"
                                    onHandleClick={()=>setCreateShape(false)}>
                                    <i class="bi bi-arrow-left"></i>
                                </BlueButton>
                            </div>
                        </div>
                    </div>
                }

                {!createShape &&
                    <div className="col-12 col-xxl-3 px-3 mb-3">
                        <BlueButton
                            onHandleClick={()=>setCreateShape(1)}
                            className="h1 w-100 h-100">
                        <i class="bi bi-plus-square-fill"></i>
                        </BlueButton>
                    </div>
                }
            </div>
        </AdminLayout>
    );
}

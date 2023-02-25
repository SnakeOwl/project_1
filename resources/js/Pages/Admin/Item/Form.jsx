import { useForm }      from '@inertiajs/inertia-react';
import AdminLayout      from '@/Layouts/AdminLayout';
import BlueButton       from '@/Components/Buttons/BlueButton';
import FloatInput       from '@/Components/Inputs/FloatInput';
import FloatTextarea    from '@/Components/Inputs/FloatTextarea';
import FloatSelect      from '@/Components/Inputs/FloatSelect';
import ParametersManager from './Components/ParametersManager';

export default function Form(props){
    const {categories, lang} = props;
    const item               = props.item? props.item: null;
    const { data, setData, post, patch } = useForm({
        name:               item? item.name: "",
        name_en:            item? item.name_en: "",
        description:        item? item.description : "",
        description_en:     item? item.description_en: "",
        category_id:        item? item.category_id: categories[0].id,
        parameters:         item? item.parameters: [{param_name: "", param_value: ""}],
    });

    function onHandleParamsRemoveRowClick(rowNumber){
        data.parameters.splice(rowNumber, 1);
        setData("parameters", data.parameters);
    }

    function onHandeParamsAddRowClick(){
        data.parameters.push( {param_name: "", param_value: ""} );
        setData("parameters", data.parameters);
    }

    function onHandleChangeParameter(event){
        const indexes = (event.target.name).split(',',2);
        data.parameters[indexes[0]][indexes[1]] = event.target.value;
        setData("parameters", data.parameters);
    }

    function onHandleSubmit(e){
        e.preventDefault();

        if (item == null)
            post(route('items.store'));
        else
            patch(route('items.update', item));
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    return (
        <AdminLayout>
            <h3>{lang["item form"]}</h3>

            <form className="col-12 mb-3" onSubmit={onHandleSubmit} enctype="multipart/form-data" novalidate>
                <div className="row">
                    <FloatInput
                        className="col-12 col-xxl-3 mb-2"
                        id="name"
                        value={data.name}
                        labelText={lang["item field name"]}
                        onHandleChange={onHandleChange}
                        isFocused={true}
                        required
                    />

                    <FloatInput
                        className="col-12 col-xxl-3 mb-3"
                        id="name_en"
                        value={data.name_en}
                        labelText={lang["item field name en"]}
                        onHandleChange={onHandleChange}
                        required
                    />

                    <FloatSelect
                        id="category_id"
                        options={categories}
                        selectedOptionIds={data.category_id}
                        labelText={lang["item field category"]}
                        onHandleChange={onHandleChange}
                        className="col-12 col-xxl-3 mb-3"
                        required
                    />
                </div>

                <div className="row">
                    <FloatTextarea
                        id="description"
                        value={data.description}
                        labelText={lang["item field description"]}
                        rows="4"
                        onHandleChange={onHandleChange}
                        className="col-12 col-lg-6 h-100 mb-2"
                        required
                    />

                    <FloatTextarea
                        id="description_en"
                        value={data.description_en}
                        labelText={lang["item field description en"]}
                        rows="4"
                        onHandleChange={onHandleChange}
                        className="col-12 col-lg-6 h-100 mb-3"
                        required
                    />
                </div>

                <div className="row mb-3">
                    <h4 className="mb-3">{lang["item field parameters"]}</h4>
                    <ParametersManager
                        leftColumnName={lang["parameters field name"]}
                        rightColumnName={lang["parameters field value"]}
                        onHandleChange={onHandleChangeParameter}
                        arrayName="parameters"
                        values={data.parameters}
                        addRow={onHandeParamsAddRowClick}
                        removeRow={onHandleParamsRemoveRowClick}
                    />
                </div>

                <BlueButton className="w-100">Сохранить</BlueButton>
            </form>

        </AdminLayout>
    );
}

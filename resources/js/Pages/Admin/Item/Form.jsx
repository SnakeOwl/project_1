import { useForm }      from '@inertiajs/inertia-react';
import AdminLayout      from '@/Layouts/AdminLayout';
import BlueButton       from '@/Components/Buttons/BlueButton';
import StandartInput    from '@/Components/Inputs/StandartInput';
import StandartTextarea from '@/Components/Inputs/StandartTextarea';
import Checkbox         from '@/Components/Inputs/Checkbox';
import Select           from '@/Components/Inputs/Select';
import Img              from '@/Components/Img'
import Input            from '@/Components/Inputs/Input';
import ParametersManager from './Components/ParametersManager';
import GaleryManager    from './Components/GaleryManager';

export default function Form(props){
    const skuProperties     = props.skuProperties? props.skuProperties: null;
    const categories        = props.categories? props.categories: null;
    const item              = props.item? props.item: null;
    const { data, setData, post, patch, errors, reset } = useForm({
        name:               item? item.name: "",
        name_en:            item? item.name_en: "",
        description:        item? item.description : "",
        description_en:     item? item.description_en: "",
        shortImage:         "",
        new:                item? item.new: 1,
        hit:                item? item.hit: 0,
        category_id:        item? item.category_id: categories[0].id,
        itemSkuProperties:  props.itemSkuProperties? props.itemSkuProperties: [],
        itemParameters:     props.itemParameters? props.itemParameters: [["",""]],
        itemGalery:         props.itemGalery? props.itemGalery: [],
        newItemGalery:      [],
    });

    function handleParamsRemoveRowClick(rowNumber){
        data.itemParameters.splice(rowNumber, 1);
        setData("itemParameters", data.itemParameters);
    }

    function handeParamsAddRowClick(){
        data.itemParameters.push(["", ""]);
        setData("itemParameters", data.itemParameters);
    }

    function handleChangeParameter(event){
        // первым значением будет row, вторым col
        const indexes = (event.target.name).split(',',2);
        data.itemParameters[indexes[0]][indexes[1]] = event.target.value;
        setData("itemParameters", data.itemParameters);
    }

    function handleRemoveImageFromGalery(number){
        data.itemGalery.splice(number, 1);
        setData("itemGalery", data.itemGalery);
    }

    function handleSubmit(e){
        e.preventDefault();

        if (item == null){
            post(route('items.store'));
        }else{
            post(route('item-update', item));
        }

        e.target.reset();
    }

    function handleMultiSelect(){
        const value = Array.from(event.target.selectedOptions, option => option.value);
        setData(event.target.name, value);
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    return (
        <AdminLayout
            auth={props.auth}
            flash={props.flash}
        >
            <h3>Поля товара</h3>

            <form className="col-12 mb-3" onSubmit={handleSubmit} enctype="multipart/form-data" novalidate>
                <div className="row">
                    <div className="col-12 col-lg-3">
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
                            labelText="Название (eng)"
                            handleChange={onHandleChange}
                            errors={errors}
                            required
                        />
                    </div>

                    <Select
                        id="category_id"
                        options={categories}
                        selectedOptionIds={data.category_id}
                        labelText="Выберите категорию из списка"
                        handleChange={onHandleChange}
                        errors={errors}
                        className="col-12 col-lg-3"
                        required
                    />

                    <Select
                        id="itemSkuProperties"
                        options={skuProperties}
                        selectedOptionIds={data.itemSkuProperties}
                        labelText="Выберите свойства для ТП"
                        handleChange={handleMultiSelect}
                        errors={errors}
                        className="col-12 col-lg-3"
                        multiple
                        required
                    />

                </div>

                <div className="row mb-3">
                    <StandartTextarea
                        id="description"
                        value={data.description}
                        labelText="Описание"
                        rows="4"
                        handleChange={onHandleChange}
                        errors={errors}
                        className="col-12 col-lg-6 h-100"
                        required
                    />

                    <StandartTextarea
                        id="description_en"
                        value={data.description_en}
                        labelText="Расписание (eng)"
                        rows="4"
                        handleChange={onHandleChange}
                        errors={errors}
                        className="col-12 col-lg-6 h-100"
                        required
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-12 col-lg-3">
                        <StandartInput
                            id="shortImage"
                            labelText="Маленькое изображение"
                            handleChange={(e) => setData(e.target.name, e.target.files[0])}
                            errors={errors}
                            type="file"
                        />
                        {item &&
                            <Img className="w-100" src={item.short_image}/>
                        }
                        <div className="text-secondary">При загрузке новой картинки, она затрет старую</div>
                    </div>
                </div>

                <div className="row mb-3">
                    <Checkbox
                        id="new"
                        value={data.new}
                        labelText="Новинка"
                        handleChange={onHandleChange}
                        errors={errors}
                        checked={data.new && "checked"}
                    />

                    <Checkbox
                        id="hit"
                        value={data.hit}
                        labelText="Хит продаж"
                        handleChange={onHandleChange}
                        errors={errors}
                        checked={data.hit && "checked"}
                    />
                </div>

                <div className="row mb-3">
                    <h3 className="mb-3">Характеристики товара:</h3>
                    <ParametersManager
                        handleChange={handleChangeParameter}
                        arrayName="itemParameters"
                        values={data.itemParameters}
                        addRow={handeParamsAddRowClick}
                        removeRow={handleParamsRemoveRowClick}
                    />
                </div>

                <div className="row mb-3">
                    <div className="col-12">
                        <h3>Управление галереей</h3>
                        <StandartInput
                            name="newItemGalery"
                            handleChange={(e) => setData(e.target.name, e.target.files)}
                            type="file"
                            labelText="Добавьте сюда новые изображения для галереи"
                            multiple="multiple"
                            accept="image"
                        />
                        {data.itemGalery &&
                            <GaleryManager
                            images={data.itemGalery}
                            removeImageHandler={handleRemoveImageFromGalery}
                            />
                        }
                    </div>
                </div>
                <BlueButton className="w-100">Сохранить</BlueButton>
            </form>

        </AdminLayout>
    );
}

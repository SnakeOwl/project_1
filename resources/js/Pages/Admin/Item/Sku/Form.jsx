import AdminLayout      from '@/Layouts/AdminLayout';
import BlueButton       from '@/Components/Buttons/BlueButton'
import StandartInput    from '@/Components/Inputs/StandartInput'
import Select           from '@/Components/Inputs/Select'
import { useForm }      from '@inertiajs/inertia-react';

export default function Form(props){
    const item = props.item? props.item: null;
    const sku = props.sku? props.sku: null;
    const { data, setData, post, patch, errors, reset } = useForm({
        price: sku? sku.price: "",
        count: sku? sku.count: "",
        skuProperties: {}
    });

    // я не ебу почему в js так хуево с созданием ассоциативного массива,
    // я не ебу как задать числовой индекс в объекте при создании 
    item.properties.map((itemOption)=>{
        data.skuProperties[itemOption.id] = sku == null?
            itemOption.options[0].id:
            sku.property_options.find(skuOption => skuOption.property_id == itemOption.id).id;
    });


    function handleSubmit(e){
        e.preventDefault();

        if (sku == null){
            post(route('items.skus.store', item));
        }else{
            patch(route('items.skus.update', [item, sku]));
        }
    }

    function handleSkuPropertiesSet(event, index){
        data.skuProperties[index] = event.target.value;
        setData("skuProperties", data.skuProperties);
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const skuSelects = item.properties.map((skuProperty)=> {
        return (
            <Select
                labelText={"Параметр: " + skuProperty.name }
                handleChange={(e) => handleSkuPropertiesSet(e, skuProperty.id)}
                options={skuProperty.options}
                selectedOptionIds={data.skuProperties[skuProperty.id]}
                errors={errors}
            />
        )});


    return (
        <AdminLayout
            auth={props.auth}
            flash={props.flash}
        >
            <h3>Форма торгового предложения (Товар: {item.name})</h3>

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <StandartInput
                        id="price"
                        value={data.price}
                        labelText="Цена"
                        className="col-12 col-xl-3"
                        handleChange={onHandleChange}
                        errors={errors}
                        isFocused={true}
                        required
                    />

                    <StandartInput
                        id="count"
                        value={data.count}
                        className="col-12 col-xl-3"
                        labelText="Количество предложений"
                        handleChange={onHandleChange}
                        errors={errors}
                        required
                    />

                </div>

                <div className="row mb-3">
                    <div className="col-12 col-xl-3">
                        {skuSelects}
                    </div>
                </div>

                <BlueButton className="w-100">Сохранить</BlueButton>
            </form>
        </AdminLayout>
    );
}

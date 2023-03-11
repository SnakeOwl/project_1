import { Inertia }      from '@inertiajs/inertia'
import { useForm }      from '@inertiajs/inertia-react'
import AdminLayout      from '@/Layouts/AdminLayout'
import BlueButton       from '@/Components/Buttons/BlueButton'
import FloatInput       from '@/Components/Inputs/FloatInput'
import StandartInput    from '@/Components/Inputs/StandartInput'
import GaleryManager    from '../Components/GaleryManager'
import ShapeCard        from '../Components/ShapeCard'
import Img              from '@/Components/Img'


export default function Form(props){
    const {item, offer, category, lang} = props;
    const {shapes} = item.category;

    const selectedOptionIds = (offer != null)?
        offer.shape_options.map( (option)=>{ return option.id} ) : null;

    const { data, setData, post } = useForm({
        item_id: item.id,
        price:          offer? offer.price: "",
        count:          offer? offer.count: "",
        shortImage:     null,
        shapeOptions:   offer? selectedOptionIds: [],
        galery:         offer? offer.images: [],
        newGaleryImages: [],
    });


    const shapeOptionSelect = (event)=>{
        const id = parseInt(event.target.name);

        if (data.shapeOptions.includes(id))
            delete data.shapeOptions[
                data.shapeOptions.findIndex((element) => element == id)
            ];
        else
            data.shapeOptions.push(id);

        setData('shapeOptions', data.shapeOptions);
    }

    const shapeOptionsChoise = shapes.map((shape)=>{
        return (
            <div className="col-12 col-xxl-3 px-3 mb-3">
                <ShapeCard
                    shape={shape}
                    onHandleChange={shapeOptionSelect}
                    checkedIds={data.shapeOptions}
                />
            </div>
        );
    });

    function removeImageFromGalery(number){
        data.galery.splice(number, 1);
        setData("galery", data.galery);
    }

    function onHandleSubmit(e){
        e.preventDefault();

        if (offer == null)
            post(route('items.offers.store', item));
        else
            post(route('offer-update', [item, offer]));
    }

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };


    return (
        <AdminLayout title={lang["offer form h"] +": "+item.name}>
            <form onSubmit={onHandleSubmit}>
                <div className="row mb-3">
                    <FloatInput
                        id="price"
                        value={data.price}
                        type="number"
                        labelText={lang['price']}
                        className="col-12 col-xl-3"
                        onHandleChange={onHandleChange}
                        isFocused={true}
                        required
                    />

                    <FloatInput
                        id="count"
                        value={data.count}
                        type="number"
                        className="col-12 col-xl-3"
                        labelText={lang['count offers']}
                        onHandleChange={onHandleChange}
                        required
                    />

                </div>

                <div className="row mb-3">
                    <div className="col-12 col-xxl-3">
                    <h2 className="text-center">{lang['offer short image']}</h2>
                        {offer &&
                            <>
                                <Img className="w-100" src={offer.short_image}/>
                                <span className="text-secondary">{lang['offer form message 1']}</span>
                            </>
                        }
                        <StandartInput
                            id="shortImage"
                            className="text-secondary"
                            onHandleChange={(e) => setData(e.target.name, e.target.files[0])}
                            type="file"
                        />
                    </div>
                </div>

                <h2 className="text-center">{lang['offer shape options h']}</h2>
                <div className="row mb-3">
                    { shapeOptionsChoise }
                </div>

                <div className="row mb-3">
                    <div className="col-12">
                        <h2 className="text-center">{lang['galery management']}</h2>
                        <StandartInput
                            name="newGaleryImages"
                            onHandleChange={(e) => setData(e.target.name, e.target.files)}
                            type="file"
                            labelText={lang['offer form message 2']}
                            multiple="multiple"
                            accept="image"
                        />
                        {data.galery &&
                            <GaleryManager
                                images={data.galery}
                                removeImageHandler={removeImageFromGalery}
                            />
                        }
                    </div>
                </div>
                <BlueButton className="w-100">{lang['submit']}</BlueButton>
            </form>

        </AdminLayout>
    );
}

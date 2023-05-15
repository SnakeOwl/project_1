import { useForm, usePage } from '@inertiajs/inertia-react'
import {RedButton} from '@/Components/Buttons'
import FloatInput from '@/Components/Inputs/FloatInput'

export default function OneClickBuyForm({
    offerId,
    hideFormHandler
})
{
    const {lang, errors} = usePage().props;
    const {data, setData, post} = useForm({
        phone: "",
        name: "",
        offer_id: offerId
    });

    function onHandleSubmit(event){
        event.preventDefault();
        post('/catalog/oneClickForm');

        if(errors.phone == null && errors.name == null)
            hideFormHandler();
    }

    function onHandleChange(event){
        setData(event.target.name, event.target.value);
    }

    return (
        <div
            onClick={hideFormHandler}
            className={"position-fixed w-100 h-100 top-0 start-0 modal-container" }
        >
            <div
                onClick={(event)=>event.stopPropagation()}
                className="modal-area position-relative col-12 col-lg-3 top-50 start-50 translate-middle p-5 rounded">
                <form onSubmit={onHandleSubmit}>
                    <p className="text-center">{lang['one click form text']}</p>
                    <FloatInput
                        className="mb-3"
                        id="name"
                        value={data.name}
                        labelText={lang['name']}
                        onHandleChange={onHandleChange}
                    />

                    <FloatInput
                        className="mb-3"
                        id="phone"
                        type="phone"
                        minlength="11"
                        value={data.phone}
                        labelText={lang['phone']}
                        onHandleChange={onHandleChange}
                    />

                    <RedButton className="w-100 inverted rounded">
                        {lang['one click form submit']}
                    </RedButton>
                </form>
            </div>
        </div>
    );
}

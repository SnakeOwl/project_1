import { useContext, useRef } from 'react';
import axiosClient from '/src/axios-client';
import { RedButton } from '/src/Components/Buttons';
import FloatInput from '/src/Components/Inputs/FloatingInputs';
import ContextGlobal from '/src/context/Global/ContextGlobal';

export default function OneClickBuyForm({
    offer,
    hideFormHandler
})
{
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    const nameRef = useRef();
    const phoneRef = useRef();

    function handleSubmit(event){
        event.preventDefault();

        axiosClient.post('/catalog/oneClickBuyStore', {
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            offer_id: offer,
        }).then(({data})=>{
            dispatchGlobal({
                type: 'SET_MESSAGE',
                message: lang[data.message]
            });

            hideFormHandler();
        }).catch(error=>{
            const {response} = error;
            
            if (response.status === 422){
                dispatchGlobal({
                    type: 'SET_MESSAGE',
                    message: response.data.message
                });
                dispatchGlobal({
                    type: 'SET_ERRORS',
                    errors: response.data.errors
                });
            }
        });
    }

    return (
        <div
            onClick={hideFormHandler}
            className={"position-fixed w-100 h-100 top-0 start-0 modal-container" }
        >
            <div
                onClick={(event)=>event.stopPropagation()}
                className="modal-area position-relative col-12 col-lg-3 top-50 start-50 translate-middle p-5 rounded">
                <form onSubmit={handleSubmit}>
                    <p className="text-center">{lang['one click form text']}</p>
                    <FloatInput
                        className="mb-3"
                        id="name"
                        labelText={lang['name']}
                        useRef={nameRef}
                        required
                    />

                    <FloatInput
                        className="mb-3"
                        id="phone"
                        type="phone"
                        minlength="11"
                        labelText={lang['phone']}
                        useRef={phoneRef}
                        required
                    />

                    <RedButton className="w-100 inverted rounded">
                        {lang['one click form submit']}
                    </RedButton>
                </form>
            </div>
        </div>
    );
}

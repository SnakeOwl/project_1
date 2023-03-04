import {useForm, usePage} from '@inertiajs/inertia-react';
import RedButton from '@/Components/Buttons/RedButton';
import FloatInput from '@/Components/Inputs/FloatInput';

export default function ({
    offer_id,
    className
}){
    const {lang} = usePage().props;
    const {data, setData, post} = useForm({
        offer_id: offer_id,
        email: ""
    });

    const onHandleSubmit = (event)=>{
        event.preventDefault();
        post(route);
    }

    return (
        <div className={className}>
            <p className="text-center">Подпишитесь и мы сообщим вам о поступлении товара</p>

            <form onSubmit={onHandleSubmit}>
                <FloatInput
                    className="mb-2"
                    type="email"
                    id="email"
                    required="required"
                    labelText="email"
                    onHandleChange={()=>setData('email', event.target.value)}
                    value={data.email}
                />
                <RedButton className="inverted rounded w-100">
                    {lang['submit']}
                </RedButton>
            </form>
        </div>
    );
}

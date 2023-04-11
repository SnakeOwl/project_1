import {usePage} from '@inertiajs/inertia-react'
import {useState} from 'react'

export default function FlashMessage(){
    const {flash} = usePage().props;
    const [hidden, setHidden] = useState(false);
console.log(flash);
    return (
        <>
        {(flash.message && !hidden) &&
            <div
                className="col-12 col-lg-3 cursor-pointer fixed-bottom m-lg-4"
                onClick={()=>setHidden(true)}
            >
                <div className="text-center box-blue rounded p-5">
                    {flash.message}
                </div>
            </div>
        }
        </>
    );
}

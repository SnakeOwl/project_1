import {usePage} from '@inertiajs/inertia-react'
import {useState} from 'react'

export default function FlashMessage(){
    const {flash} = usePage().props;
    const [hidden, setHidden] = useState(false);
    return (
        <>
        {(flash.message && !hidden) &&
            <div
                className="fixed-bottom m-4"
                onClick={()=>setHidden(true)}
                >
                <div className="col-6 col-lg-3 text-center box-blue rounded p-5">
                    {flash.message}
                </div>
            </div>
        }
        </>
    );
}

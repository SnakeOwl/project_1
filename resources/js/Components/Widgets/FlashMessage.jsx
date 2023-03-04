import {usePage} from '@inertiajs/inertia-react';

export default function FlashMessage(){
    const {flash} = usePage().props;

    return (
        <>
        {flash.message &&
            <div className="container p-4 my-2 box-blue ">
                <div className="row">
                    <div className="col-12 text-center">
                        {flash.message}
                    </div>
                </div>
            </div>
        }
        </>
    );
}

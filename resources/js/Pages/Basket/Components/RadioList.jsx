import { usePage } from '@inertiajs/inertia-react'

export default function RadioList({
    storages,
    name,
    id,
    onHandleChange,
    className
}){
    name=name? name: id;
    const {lang} = usePage().props;

    const cards = storages.map((storage)=>{
        return (
            <div class="card mb-3">
                <div class="card-header">
                    <input type="radio" name={name} value={storage.id} id={storage.id} onChange={onHandleChange} />
                    <label for={storage.id}>&nbsp;{storage.name}</label>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        {lang["address"]}: {storage.address} <br/>
                        {lang["phone"]}: {storage.phone} <br/>

                        {lang["schedule"]}: <span dangerouslySetInnerHTML={{__html: storage.schedule}}></span>
                    </p>
                </div>
            </div>
        );
    });

    return (
        <div className={"container " + className} id={id}>
            {cards}
        </div>
    );
}

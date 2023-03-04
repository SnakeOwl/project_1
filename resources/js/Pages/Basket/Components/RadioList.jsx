export default function RadioList({
    storages,
    name,
    id,
    onHandleChange,
    className
}){
    name=name? name: id;

    const cards = storages.map((storage)=>{
        return (
            <div class="card mb-3">
                <div class="card-header">
                    <input type="radio" name={name} value={storage.id} id={storage.id} onChange={onHandleChange} />
                    <label for={storage.id}>&nbsp;{storage.name}</label>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        Адрес: {storage.address} <br/>
                        Телефон: {storage.phone} <br/>

                        Время работы: <span dangerouslySetInnerHTML={{__html: storage.schedule}}></span>
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

import Checkbox from '@/Components/Inputs/Checkbox';

export default function ShapeCard ({
    shape,
    checkedIds=[],
    className="",
    onHandleChange
}){
    const options = shape.shape_options.map((option)=>{
        return(
            <div className="list-group-item">
                <Checkbox
                    id={option.id}
                    onHandleChange={onHandleChange}
                    labelText={option.value}
                    checked={checkedIds.includes(option.id)?"checked": false }
                />
            </div>
        );
    });

    return (
        <div className={"card h-100 " + className}>
            <div className="card-header">
                {shape.name}
            </div>
            <div className="card-body">
                <div className="list-group list-group-flush">
                    {options}
                </div>
            </div>
        </div>

    );
}

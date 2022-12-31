import RadioBox from "@/Components/Inputs/RadioBox";

export default function CardList({
    className,
    inputType="radio",
    id,
    name,
    value,
    label,
    text
}){
    return (
        <div className={"card " + className}>
            <div className="card-header">
                <RadioBox
                    name={name}
                    value={value}
                    id={id}
                    labelText={label}
                />
            </div>
            <div className="card-body">
                <p className="card-text">
                    {text}
                </p>
            </div>
        </div>
    );
}

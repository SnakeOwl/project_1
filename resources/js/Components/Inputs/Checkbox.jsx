import InputError from '@/Components/InputError';

export default function Checkbox({
    id,
    name,
    value,
    handleChange,
    labelText,
    className,
    checked,
    errors,
}) {
    return (
        <div className="form-check">
            <input
                id={id}
                type="checkbox"
                name={name? name: id}
                value={value}
                className={"form-check-input " + className}
                onChange={(e) => handleChange(e)}
                checked={checked}
            />
            <label htmlFor={id}>{labelText}</label>

            <InputError message={errors[id]} className="mt-1 text-danger" />
        </div>

    );
}

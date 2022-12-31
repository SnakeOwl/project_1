import InputError from '@/Components/InputError';

export default function RadioBox({
    id,
    name,
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
                type="radio"
                name={name? name: id}
                className={"form-check-input " + className}
                onChange={(e) => handleChange(e)}
                checked={checked}
            />
            <label className="form-check-label" htmlFor={id}>{labelText}</label>

            {errors && <InputError message={errors[id]} />}
        </div>

    );
}

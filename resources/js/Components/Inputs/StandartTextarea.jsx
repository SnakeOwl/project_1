import InputError from '@/Components/InputError';

export default function FloatInput({
    id,
    className = '',
    name,
    labelText,
    maxlength,
    required,
    placeholder,
    autofocus,
    cols,
    rows,
    disabled,
    value,
    handleChange,
    errors,
}){
    return (
        <div className={"mb-3 " + className}>
            <label
                className="form-label"
                htmlFor={id}
            >
            {labelText}
            </label>

            <textarea
                className="form-control h-100"
                name={name? name: id}
                id={id}
                cols={cols}
                rows={rows}
                placeholder={placeholder}
                required={required}
                autofocus={autofocus}
                disabled={disabled}
                value={value}
                onChange={(e) => handleChange(e)}
            />

            {errors &&
                <InputError message={errors[id]} />
            }
        </div>
    );
}

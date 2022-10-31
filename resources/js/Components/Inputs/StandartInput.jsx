import InputError from '@/Components/InputError';

export default function StandartInput({
    id,
    className = '',
    type="text",
    name,
    labelText,
    min,
    max,
    minlength="1",
    maxlength="255",
    required,
    placeholder,
    disabled,
    readonly,
    value,
    autocomplete = "on",
    handleChange,
    errors=null,
    isFocused,
    multiple,
    accept,
}){
    return (
        <div className={"mb-3 " + className}>
            <label class="form-label" htmlFor={id}>{labelText}</label>

            <input
                className="form-control"
                id={id}
                type={type}
                name={name? name: id}
                placeholder={placeholder? placeholder: id}
                min={min}
                max={max}
                minlength={minlength}
                maxlength={maxlength}
                required={required}
                disabled={disabled}
                readonly={readonly}
                value={value}
                autocomplete={autocomplete}
                onChange={(e) => handleChange(e)}
                autofocus={isFocused}
                multiple={multiple}
                accept={accept}
                />

            <InputError message={errors? errors[id]: ""} className="mt-1 text-danger" />
        </div>
    );
}

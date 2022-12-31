import InputError from '@/Components/InputError';

export default function FloatInput({
    id,
    className = '',
    type="text",
    name,
    labelText,
    min,
    max,
    minlength="2",
    maxlength="255",
    required,
    placeholder="something to work",
    disabled,
    readonly,
    value,
    autocomplete = "on",
    inputClassName,
    isFocused,
    handleChange,
    errors,
}){
    return (
        <div className={"form-floating " + className}>
            <input
                className={"form-control " + inputClassName}
                id={id}
                type={type}
                name={name? name: id}
                placeholder={placeholder}
                min={min}
                max={max}
                minlength={minlength}
                maxlength={maxlength}
                required={required}
                disabled={disabled}
                readonly={readonly}
                value={value}
                autocomplete={autocomplete}
                autofocus={isFocused}
                onChange={(e) => handleChange(e)}
                />

            <label htmlFor={id}>{labelText}</label>
            {errors &&
                <InputError message={errors[id]} />
            }
        </div>
    );
}

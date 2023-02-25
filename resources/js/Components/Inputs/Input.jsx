import { useForm } from '@inertiajs/inertia-react';

export default function Input({
    autocomplete = "on",
    id,
    className='',
    type="text",
    name,
    min,
    max,
    minlength="1",
    maxlength="255",
    required,
    placeholder,
    disabled,
    readonly,
    value,
    onHandleChange,
    isFocused,
    multiple,
    step,
}){

    return (
        <>
            <input
                className={'form-control' + className}
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
                onChange={onHandleChange}
                autofocus={isFocused}
                multiple={multiple}
                step={step}
            />
        </>
    );
}

import InputError from '@/Components/InputError';
import {usePage} from '@inertiajs/inertia-react';

export default function StandartInput({
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
    placeholder,
    disabled,
    readonly,
    value,
    autocomplete = "on",
    onHandleChange,
    isFocused,
    multiple,
    accept,
}){
    const {errors} = usePage().props;

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
                onChange={onHandleChange}
                autofocus={isFocused}
                multiple={multiple}
                accept={accept}
                />

                {errors &&
                    <InputError message={errors[id]} />
                }
        </div>
    );
}

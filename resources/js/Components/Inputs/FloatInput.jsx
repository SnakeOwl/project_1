import InputError from '@/Components/InputError';
import {usePage} from '@inertiajs/inertia-react';

export default function FloatInput({
    id,
    className = '',
    inputClassName,
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
    isFocused,
    onHandleChange,
}){
    const {errors} = usePage().props;

    return (
        <div className={className}>
            <div className="form-floating">
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
                    onChange={(e) => onHandleChange(e)}
                    />

                <label htmlFor={id}>{labelText}</label>
                {errors &&
                    <InputError message={errors[id]} />
                }
            </div>
        </div>
    );
}

import InputError from '@/Components/InputError';
import {usePage} from '@inertiajs/inertia-react';

export default function Checkbox({
    id,
    name,
    onHandleChange,
    labelText,
    className,
    checked,
    disabled
}) {
    const {errors} = usePage().props;

    return (
        <div className="form-check">
            <input
                id={id}
                type="checkbox"
                name={name? name: id}
                className={"form-check-input " + className}
                onChange={(e) => onHandleChange(e)}
                checked={checked}
                disabled={disabled}
            />
            <label className="form-check-label" htmlFor={id}>{labelText}</label>

            {errors && <InputError message={errors[id]} />}
        </div>

    );
}

import InputError from '@/Components/InputError';
import {usePage} from '@inertiajs/inertia-react';


export default function RadioBox({
    id,
    name,
    onHandleChange,
    labelText,
    className,
    checked,
}) {
    const {errors} = usePage().props;

    return (
        <div className="form-check">
            <input
                id={id}
                type="radio"
                name={name? name: id}
                className={"form-check-input " + className}
                onChange={onHandleChange}
                checked={checked}
            />
            <label className="form-check-label" htmlFor={id}>{labelText}</label>

            {errors && <InputError message={errors[id]} />}
        </div>

    );
}

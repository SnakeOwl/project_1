import InputError from '@/Components/InputError';
import {usePage} from '@inertiajs/inertia-react';


export default function FloatInput({
    id,
    className='',
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
    onHandleChange,
}){
    const {errors} = usePage().props;

    return (
        <div className={className}>
            <div className="form-floating">
                <textarea
                    class="form-control h-100"
                    name={name? name: id}
                    id={id}
                    cols={cols}
                    rows={rows}
                    placeholder={" " + placeholder}
                    required={required}
                    autofocus={autofocus}
                    disabled={disabled}
                    value={value}
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

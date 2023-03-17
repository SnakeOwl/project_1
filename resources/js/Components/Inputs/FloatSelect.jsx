import InputError from '@/Components/InputError';
import {usePage} from '@inertiajs/inertia-react';

/*
    options - array with "id" and "name" (there are name_en)
    selectedOptionIds - one id, or array of ids
*/
export default function FloatSelect ({
    id,
    name,
    options,
    className,
    labelText,
    selectedOptionIds = null, // maybe one id
    multiple,
    disabled,
    classNameInput,
    onHandleChange,
}){
    const {errors, currentLocale} = usePage().props;

    const list = options.map((option) => {
        return(
            <option
                value={option.id}
                selected={
                    Array.isArray(selectedOptionIds)?
                    selectedOptionIds.indexOf(option.id) !== -1:
                    selectedOptionIds === option.id
                    && "selected"
                }
            >
                {currentLocale=="en"? option.name_en: option.name}
            </option>
        );
    });


    return (
        <div className={className}>
            <div className="form-floating">
                <select
                    id={id}
                    name={name? name: id}
                    class={"form-select " + classNameInput}
                    multiple={multiple}
                    disabled={disabled}
                    onChange={onHandleChange} >
                    {list}
                </select>
                <label htmlFor={id}>{labelText}</label>

                {errors &&
                    <InputError message={errors[id]} />
                }
            </div>
        </div>

    );
}

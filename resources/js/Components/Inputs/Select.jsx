import InputError from '@/Components/InputError';

/*
    options - array with "id" and "name"
    selectedOptionIds - one id, or array of ids
*/
export default function Select ({
    id,
    name,
    options,
    className,
    labelText,
    selectedOptionIds = null, // maybe one id
    multiple,
    disabled,
    errors,
    handleChange,
}){
    const list = [];

    options.forEach((option) => {
        list.push(
            <option
                value={option.id}
                selected={
                    Array.isArray(selectedOptionIds)?
                    selectedOptionIds.indexOf(option.id) !== -1:
                    selectedOptionIds === option.id
                    && "selected"
                }
            >
                {option.name}
            </option>
        );
    });


    return (
            <div className={className}>
                <label htmlFor={id}>{labelText}</label>
                <select
                    id={id}
                    name={name? name: id}
                    class="form-select"
                    multiple={multiple}
                    disabled={disabled}
                    onChange={handleChange}
                >
                    {list}
                </select>

                {errors &&
                    <InputError message={errors[id]} />
                }
            </div>
    );
}

import InputError from '@/Components/InputError';

export default function Select ({
    id,
    name,
    options, // array with "id" and "name"
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
                <InputError message={errors[id]} className="mt-1 text-danger" />
            </div>
    );
}

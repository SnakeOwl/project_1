export default function FloatInput({
    id,
    className = '',
    type="text",
    name,
    labelText,
    min,
    max,
    minlength,
    maxlength,
    required,
    placeholder="something to work",
    disabled,
    readonly,
    value,
    autocomplete = "on",
    isFocused,
    handleChange,
}){
    return (
        <div className={"form-floating " + className}>
            <input
                className="form-control"
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
        </div>
    );
}

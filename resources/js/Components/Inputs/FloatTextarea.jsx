export default function FloatInput({
    id,
    className = '',
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
    handleChange,
}){
    return (
        <div className="form-floating">
            <textarea
                class={"form-control h-100 " + className}
                name={name? name: id}
                id={id}
                cols={cols}
                rows={rows}
                placeholder={" " + placeholder}
                required={required}
                autofocus={autofocus}
                disabled={disabled}
                value={value}
                onChange={(e) => handleChange(e)}
                />
            <label htmlFor={id}>{labelText}</label>
        </div>
    );
}

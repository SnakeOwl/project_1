import InputError from './InputError';
import { useContext } from 'react';
import ContextGlobal from '../../context/Global/ContextGlobal';



export function FloatInput({
    useRef,
    id,
    className = '',
    classNameInput,
    type="text",
    name,
    labelText,
    min,
    max,
    minLength="2",
    maxLength="255",
    required,
    placeholder="something to work",
    disabled,
    readOnly,
    value,
    autoComplete = "on",
    isFocused,
    onHandleChange=()=>{},
}){
    const {stateGlobal} = useContext(ContextGlobal);
    const {errors, currentLocale} = stateGlobal;
    
    return (
        <div className={className}>
            <div className="form-floating">
                <input
                    ref={useRef}
                    className={"form-control " + classNameInput}
                    id={id}
                    type={type}
                    name={name? name: id}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    minLength={minLength}
                    maxLength={maxLength}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    value={value}
                    autoComplete={autoComplete}
                    autoFocus={isFocused}
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

export  function FloatTextarea({
    useRef,
    id,
    className='',
    name,
    labelText,
    required,
    placeholder,
    autoFocus,
    cols,
    rows,
    disabled,
    value,
    onHandleChange,
}){
    const {stateGlobal} = useContext(ContextGlobal);
    const {errors, currentLocale} = stateGlobal;
    
    return (
        <div className={className}>
            <div className="form-floating">
                <textarea
                    ref={useRef}
                    className="form-control h-100"
                    name={name? name: id}
                    id={id}
                    cols={cols}
                    rows={rows}
                    placeholder={" " + placeholder}
                    required={required}
                    autoFocus={autoFocus}
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

/*
    options - array with "id" and "name" (there are name_en)
    selectedOptionIds - one id, or array of ids
*/
export function FloatSelect ({
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
    useRef,
}){
    const {stateGlobal} = useContext(ContextGlobal);
    const {errors, currentLocale} = stateGlobal;
    
    const list = options.map((option) => {
        return(
            <option
                key={`list-option-${option.id}`}
                value={option.id}
                defaultValue={
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
                    ref={useRef}
                    id={id}
                    name={name? name: id}
                    className={"form-select " + classNameInput}
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

export default FloatInput;

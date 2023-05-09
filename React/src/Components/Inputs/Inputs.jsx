import InputError from './InputError';
import { useContext } from 'react';
import ContextGlobal from '../../context/Global/ContextGlobal';

export function Checkbox({
    id,
    name,
    useRef,
    labelText,
    className,
    onHandleChange=()=>{},
    disabled
}) {
    const {errors} = useContext(ContextGlobal);

    return (
        <div className="form-check">
            <input
                onChange={onHandleChange}
                id={id}
                ref={useRef}
                type="checkbox"
                name={name? name: id}
                className={"form-check-input " + className}
                disabled={disabled}
            />
            <label className="form-check-label" htmlFor={id}>{labelText}</label>

            {errors && <InputError message={errors[id]} />}
        </div>

    );
}



export function Input({
    useRef,
    autoComplete = "on",
    id,
    className='',
    type="text",
    name,
    min,
    max,
    minLength="1",
    maxLength="255",
    required,
    placeholder,
    disabled,
    readOnly,
    value,
    onHandleChange,
    isFocused,
    multiple,
    step,
}){

    return (
        <>
            <input
                ref={useRef}
                className={'form-control ' + className}
                id={id}
                type={type}
                name={name? name: id}
                placeholder={placeholder? placeholder: id}
                min={min}
                max={max}
                minLength={minLength}
                maxLength={maxLength}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                value={value}
                autoComplete={autoComplete}
                onChange={onHandleChange}
                autoFocus={isFocused}
                multiple={multiple}
                step={step}
            />
        </>
    );
}

export default Input;
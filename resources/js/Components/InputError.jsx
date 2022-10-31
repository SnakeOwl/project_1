export default function InputError({ message, className = '' }) {
    return message ? <p className={'text-sm text-danger ' + className}>{message}</p> : null;
}

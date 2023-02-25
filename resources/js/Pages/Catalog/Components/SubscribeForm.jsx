import FloatInput from '@/Components/Inputs/FloatInput';

export default function (className='', csrf_token){
    return (
        <form className="ms-auto" action="" method="post">
            <input type="hidden" name="_token" value={csrf_token} />
            <FloatInput className="text-start" type="email" id="email" placeholder="my_email@gmail.com" required="required" labelText="email" />
            <button type="submit" className="bttn blue ms-auto">Подписаться</button>
        </form>
    );
}

import { usePage, useForm } from '@inertiajs/inertia-react';
import BlueLink from '@/Components/Links/BlueLink';
import RedLink from '@/Components/Links/RedLink';
import RedButton from '@/Components/Buttons/RedButton';


export default function UserLinks (){
    const {auth} = usePage().props;
    const { post } = useForm();

    function handleSubmit(e){
        e.preventDefault();

        post(route('logout'));
    };

    let userButtons;
    if (auth.user){
        userButtons =
            <>
                <BlueLink  href={route('register')}><i class="bi bi-person"></i></BlueLink>
                {
                    auth.userIsEditor &&
                    <BlueLink  href={route('supervisor')}><i class="bi bi-gear-fill"></i></BlueLink>
                }
                <form className="d-inline" onSubmit={handleSubmit}>
                    <RedButton>Выход</RedButton>
                </form>

            </>
    }else{
        userButtons =
            <>
                <BlueLink  href={route('register')}>Регистрация</BlueLink>
                <BlueLink  href={route('login')}>Вход</BlueLink>
            </>
    }

    return (
        <>
            {userButtons}
        </>
    );
}

import { usePage, useForm } from '@inertiajs/inertia-react';
import BlueLink from '@/Components/Links/BlueLink';
import RedButton from '@/Components/Buttons/RedButton';

export default function UserLinks (){
    const {auth, lang} = usePage().props;
    const { post } = useForm();

    const userButtons = (auth.user)?
        <>
            <BlueLink  href={route("personal-page")}><i class="bi bi-person-fill"></i></BlueLink>

            {auth.userIsEditor &&
                <BlueLink  href={route('supervisor')}><i class="bi bi-nut-fill"></i></BlueLink>
            }

            <RedButton
                title={lang['exit']}
                onHandleClick={()=>post(route('logout'))}
            >
                <i class="bi bi-box-arrow-up-right"></i>
            </RedButton>
        </>
    :
        <>
            <BlueLink  href={route('login')}>{lang["login"]}</BlueLink>
        </>
    ;

    return (
        <>
            {userButtons}
        </>
    );
}

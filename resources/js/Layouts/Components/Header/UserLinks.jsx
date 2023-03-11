import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import BlueLink from '@/Components/Links/BlueLink';
import RedButton from '@/Components/Buttons/RedButton';
import BlueButton from '@/Components/Buttons/BlueButton';

export default function UserLinks ({
    className=""
}){
    const {auth, lang} = usePage().props;

    const userButtons = (auth.user)?
        <>
            <BlueButton
                className="rounded inverted small me-2"
                onHandleClick={()=> Inertia.get(route("personal-page"))}
                title={lang['personal page']}
            >
                <i class="bi bi-person-fill"></i>
            </BlueButton>

            {auth.userIsEditor &&
                <BlueButton
                    className="rounded small me-2"
                    onHandleClick={()=> Inertia.get(route("supervisor"))}
                >
                    <i class="bi bi-nut-fill"></i>
                </BlueButton>
            }

            <RedButton
                className="rounded inverted small me-2"
                title={lang['exit']}
                onHandleClick={()=> Inertia.post(route('logout'))}
            >
                <i class="bi bi-box-arrow-up-right"></i>
            </RedButton>
        </>
    :
        <>
            <BlueButton
                className="rounded inverted small"
                onHandleClick={()=> Inertia.get(route("login"))}
            >
                {lang["login"]}
            </BlueButton>
        </>
    ;

    return (
        <div className={className}>
            {userButtons}
        </div>
    );
}

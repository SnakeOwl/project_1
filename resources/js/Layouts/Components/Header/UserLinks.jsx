import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import BlueLink from '@/Components/Links/BlueLink';
import RedButton from '@/Components/Buttons/RedButton';

export default function UserLinks ({
    className=""
}){
    const {auth, lang} = usePage().props;

    const userButtons = (auth.user)?
        <>
            <BlueLink
                className="rounded inverted small me-2"
                href={route("personal-page")}
            >
                <i class="bi bi-person-fill"></i>
            </BlueLink>

            {auth.userIsEditor &&
                <BlueLink
                    className="rounded small me-2"
                    href={route('supervisor')}
                >
                    <i class="bi bi-nut-fill"></i>
                </BlueLink>
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
            <BlueLink
                className="rounded inverted small"
                href={route('login')}
            >
                {lang["login"]}
            </BlueLink>
        </>
    ;

    return (
        <div className={className}>
            {userButtons}
        </div>
    );
}

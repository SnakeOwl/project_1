import { usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import {RedButton} from '@/Components/Buttons';
import { BlueLink } from '@/Components/Links';

export default function UserLinks ({
    className=""
}){
    const {auth, lang} = usePage().props;

    const userButtons = (auth.user)?
        <>
            <BlueLink
                className="rounded inverted small me-2"
                href="/user"
                title={lang['personal page']}
            >
                <i className="bi bi-person-fill"></i>
            </BlueLink>

            {auth.userIsEditor &&
                <BlueLink
                    className="rounded small me-2"
                    href="/admin"
                >
                    <i className="bi bi-nut-fill"></i>
                </BlueLink>
            }

            <RedButton
                className="rounded inverted small me-2"
                title={lang['exit']}
                onHandleClick={()=> Inertia.post(route('logout'))}
            >
                <i className="bi bi-box-arrow-up-right"></i>
            </RedButton>
        </>
    :
        <>
            <BlueLink
                className="rounded inverted small"
                href={route("login")}
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

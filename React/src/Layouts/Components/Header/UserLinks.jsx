import {BlueLink} from '../../../Components/Links';
import { RedButton } from '../../../Components/Buttons';
import { useContext } from 'react';
import ContextGlobal from '../../../context/Global/ContextGlobal';
import axiosClient from '../../../axios-client';

export default function UserLinks ({
    className=""
}){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {user, lang} = stateGlobal;


    function logout (){
        axiosClient.post('logout')
            .then(()=>{
                dispatchGlobal({
                    type: 'ERASE_USER_AND_TOKEN',
                });
            });
    }

    const userButtons = (user !== null)?
        <>
            <BlueLink
                className="rounded inverted small me-2"
                to={"personal-page"}
                title={lang['personal page']}
            >
                <i className="bi bi-person-fill"></i>
            </BlueLink>

            {user.userIsEditor &&
                <BlueLink
                    className="rounded small me-2"
                    to={"supervisor"}
                >
                    <i className="bi bi-nut-fill"></i>
                </BlueLink>
            }

            <RedButton
                className="rounded inverted small me-2"
                title={lang['exit']}
                onHandleClick={logout}
            >
                <i className="bi bi-box-arrow-up-right"></i>
            </RedButton>
        </>
    :
        <>
            <BlueLink
                className="rounded inverted small"
                to={"login"}
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
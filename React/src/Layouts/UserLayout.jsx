import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Preloader from '../Components/Preloader';
import ContextGlobal from '../context/Global/ContextGlobal';
import UserLeftMenu from './Components/Menus/UserLeftMenu';
import ILayout from './ILayout';


export default function UserLayout()
{
    const {stateGlobal} = useContext(ContextGlobal);
    // пользователя задаёт компонент PostEffectHandler
    const {user} = stateGlobal;

    if (localStorage.getItem('ACCESS_TOKEN') === null)
        return <Navigate to="/" />

    return (
        <div className="container">
                {user === null &&
                    <Preloader/>
                }
                {user !== null &&
                    <div className="row">
                        <div className="col-12 col-lg-3 mb-4">
                            <UserLeftMenu />
                        </div>
                        <div className="col-12 col-lg-9">
                            <Outlet />
                        </div>
                    </div>
                }
            </div>
    );
}
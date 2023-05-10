import { useReducer } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ContextGlobal from '../context/Global/ContextGlobal';
import ReducerGlobal from '../context/Global/ReducerGlobal';
import StateGlobal from '../context/Global/StateGlobal';
import Messages from './Components/Messages';
import PostEffectHandler from './Components/PostEffectHandler';
import { Outlet } from 'react-router-dom';

export default function ILayout({children})
{
    const [stateGlobal, dispatchGlobal] = useReducer(ReducerGlobal, StateGlobal);
    const {themeColor} = stateGlobal;

    document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", themeColor);
    
    return (
        <ContextGlobal.Provider value={{stateGlobal, dispatchGlobal}}>
            <Header />
            <main className="container-fluid my-4">
                <Outlet />
            </main>
            <Footer />
            <Messages />
            <PostEffectHandler />
        </ContextGlobal.Provider>
    );
}
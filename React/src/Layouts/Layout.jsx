import { useReducer } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ContextGlobal from '../context/Global/ContextGlobal';
import ReducerGlobal from '../context/Global/ReducerGlobal';
import StateGlobal from '../context/Global/StateGlobal';
import { Outlet } from 'react-router-dom';

export default function Layout({
    className="",
    title="Project 1 Frontend"
})
{
    const [stateGlobal, dispatchGlobal] = useReducer(ReducerGlobal, StateGlobal);
    console.log('stateGlobal');
    console.log(stateGlobal);
    document.title = title;
    const {themeColor} = "dark";
    document.getElementsByTagName("html")[0].setAttribute("data-bs-theme", themeColor);
    
    return (
        <ContextGlobal.Provider value={{stateGlobal, dispatchGlobal}}>
            <Header />
            <main className={"container-fluid " + className}>
                <div className="row">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </ContextGlobal.Provider>
    );
}
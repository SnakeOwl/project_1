import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import ContextGlobal from "../../context/Global/ContextGlobal";

export default function Footer(){
    const {stateGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal; //stateGlobal;
    
    return (
        <footer className="container-fluid bg-dark text-light pt-5 pb-4 mt-5">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 col-xxl-3 px-3 text-justify">
                        <h2 className="text-center"><Logo/></h2>
                        <p>{lang['footer text 1']}</p>
                        <p>{lang['footer text 2']}</p>
                        <p className="text-end">2023</p>
                    </div>

                    <div className="col-12 col-xxl-5 px-3">
                        <h4>support</h4>
                        <Link to="/contact-form">{lang['contact form']}</Link>
                    </div>
                    <div className="col-12 col-xxl-4 px-3">
                        <h4>{lang['contacts']}</h4>
                        <p>
                            <a className="mb-3"  href="tel:375291234567" itemProp="telephone" content="375291234567"> 375 29 123 4567</a>
                        </p>

                        <a href="https://github.com/SnakeOwl/project_1" rel="noreferrer" target="_blank"><i className="bi bi-github h1"></i></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        {lang['powered with']} &nbsp;
                        <a className="me-2" href="https://getbootstrap.com/" rel="noreferrer" target="_blank">
                            <img width={24} src="/images/system/logo_bootstrap.svg" alt="" />
                        </a>
                        <a className="me-2" href="https://laravel.com/" rel="noreferrer" target="_blank">
                            <img width={24} src="/images/system/logo_laravel.svg" alt="" />
                        </a>
                        <a className="me-2" href="https://reactjs.org/" rel="noreferrer" target="_blank">
                            <img width={24} src="/images/system/logo_react.jpg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
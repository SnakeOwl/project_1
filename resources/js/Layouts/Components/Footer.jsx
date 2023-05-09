import { Inertia } from '@inertiajs/inertia'
import Logo from '@/Components/Logo';
import Img from '@/Components/Img';
import { usePage } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';

export default function Footer(){
    const {lang} = usePage().props;

    return (
        <footer className="container-fluid bg-dark text-light pt-5 pb-4 mt-4">
            <div className="container">
                <div className="row mb-4">
                    <div className="col-12 col-xxl-3 mb-3 px-3 text-justify">
                        <h2 className="text-center"><Logo /></h2>
                        <p>{lang['footer text 1']}</p>
                        <p>{lang['footer text 2']}</p>
                        <p className="text-end">2023</p>
                    </div>

                    <div className="col-12 col-xxl-5 mb-3 px-3 text-center text-lg-start">
                        <h4>{lang['support']}</h4>
                        <Link href={route('message-form')} >{lang['contact form']}</Link>
                    </div>

                    <div className="col-12 col-xxl-4 mb-3 px-3 text-center text-lg-start">
                        <h4>{lang['contacts']}</h4>
                        <p>
                            <a className="mb-3"  href="tel:375291234567" itemprop="telephone" content="375291234567"> 375 29 123 4567</a>
                        </p>

                        <a href="https://github.com/SnakeOwl/project_1" target="_blank"><i class="bi bi-github h1"></i></a>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center">
                        Powered with &nbsp;
                        <a href="https://getbootstrap.com/" target="_blank">
                            <Img className="me-2" src="system/logo_bootstrap.svg" width="24"/>
                        </a>
                        <a href="https://laravel.com/" target="_blank">
                            <Img className="me-2" src="system/logo_laravel.svg" width="24"/>
                        </a>
                        <a href="https://reactjs.org/" target="_blank">
                            <Img className="me-2" src="system/logo_react.jpg" width="24"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

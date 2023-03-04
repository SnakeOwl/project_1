import Logo from '@/Components/Logo';
import Img from '@/Components/Img';
import { usePage } from '@inertiajs/inertia-react';

export default function Footer(){
    const {lang} = usePage().props;
    return (
        <footer className="container-fluid bg-dark text-light pt-5 pb-4 mt-5">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12 col-xxl-3 px-3 text-justify">
                        <h2 className="text-center"><Logo /></h2>
                        <p>{lang['footer text 1']}</p>
                        <p>{lang['footer text 2']}</p>
                        <p className="text-end">2023</p>
                    </div>

                    <div className="col-12 col-xxl-5 px-3">
                        <h4>{lang['support']}</h4>
                        <a href={route('message-form')}>{lang['contact form']}</a>
                    </div>
                    <div className="col-12 col-xxl-4 px-3">
                        <h4>{lang['contacts']}</h4>
                        <p>
                            <a className="mb-3"  href="tel:375291234567" itemprop="telephone" content="375291234567"> 375 29 123 4567</a>
                        </p>

                        <a href="https://github.com/SnakeOwl/project_1" target="_blank"><i class="bi bi-github h1"></i></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        Powered by &nbsp;
                        <a href="https://getbootstrap.com/">
                            <Img className="me-2" src="system/logo_bootstrap.svg" width="24"/>
                        </a>
                        <a href="https://laravel.com/">
                            <Img className="me-2" src="system/logo_laravel.svg" width="24"/>
                        </a>
                        <a href="https://reactjs.org/">
                            <Img className="me-2" src="system/logo_react.jpg" width="24"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

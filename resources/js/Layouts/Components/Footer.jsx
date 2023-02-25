import { usePage } from '@inertiajs/inertia-react';

export default function Footer(){
    const {lang} = usePage().props;
    return (
        <footer key="Footer" className="container-fluid bg-dark text-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-xxl-3">
                        <h4>{lang['contacts']}</h4>
                        <a className=""  href="tel:375291234567" itemprop="telephone" content="375291234567"> 375 29 123 4567</a>
                    </div>

                    <div className="col-12 col-xxl-3">
                        <h4>{lang['support']}</h4>
                        <a href={route('message-form')}>{lang['contact form']}</a>
                    </div>
                    <div className="col-12 col-xxl-3">
                        <a href="#"><i class="bi bi-github h1"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

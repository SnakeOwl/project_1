import React from 'react';
import Logo from '@/Components/Logo';

export default function Footer(){
    return (
        <footer key="Footer" className="container-fluid bg-dark text-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-3">
                        <h4>Контактный телефон:</h4>
                        <a className=""  href="tel:375291234567" itemprop="telephone" content="375291234567"> 375 29 123 4567</a>
                    </div>

                    <div className="col-12 col-lg-3">
                        <h4>Поддержка</h4>
                        <a href={route('message-form')}>Связь с администрацией</a>
                    </div>

                    <div className="col-12 col-lg-3">
                    <h4><Logo /></h4>
                    </div>
                </div>
            </div>
        </footer>
    );
}

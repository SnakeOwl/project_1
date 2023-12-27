import Logo from '@/_Components/Logo';
import Link from 'next/link';
import {memo} from 'react';
import PoweredWithBlock from './Footer/PoweredWithBlock';


const Footer = ({dict}: {dict: any}) =>  {
    return (
        <footer className="text-gray-200 text-center  py-4 px-4 mt-8 w-full bg-gray-950 border-t-2 border-gray-900">
            <div className="flex flex-wrap 2xl:w-3/4 mx-auto">
                <div className="xl:w-1/3 px-2 mb-3 text-justify ">
                    <h3 className='text-center'><Logo /></h3>
                    <p>{dict['footer text 1']}</p>
                    <p>{dict['footer text 2']}</p>
                </div>
                <div className="w-full xl:w-1/3 text-center px-2 mb-3">
                    <h3>{dict["support"]}</h3>
                    <Link href={"/support"}>{dict["contact form"]}</Link>
                </div>

                <div className="w-full xl:w-1/3 text-center px-2">
                    <h3>{dict["contacts"]}</h3>
                    <p>
                        <a className="mb-3" href="tel:375291234567" itemProp="telephone" content="375291234567"> 375 29 123 4567</a>
                    </p>
                    <a href="https://github.com/SnakeOwl/project_1_frontend" rel="noreferrer" target="_blank"><i className="bi bi-github h1"></i></a>
                </div>
            </div>

            <PoweredWithBlock />
        </footer>
    );
}


export default memo(Footer);
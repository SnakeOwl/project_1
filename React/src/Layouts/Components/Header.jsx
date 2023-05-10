import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import UserLinks from "./Header/UserLinks";
import ThemeChanger from "./Header/ThemeChanger";
import LocaleChanger from "./Header/LocaleChanger";
import { RedLink } from "/src/Components/Links";

export default function Header(){
    const toBasketButton = localStorage.getItem("basketKey") !== null;

    return (
        <header className="container-fluid shadow-sm py-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <h1 className="text-center">
                            <Link to="/"> 
                                <Logo/>
                            </Link>
                        </h1>

                    </div>
                    <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center justify-content-lg-end">
                        {toBasketButton &&
                            <RedLink
                                className="me-2 small rounded"
                                to={'basket'}
                            >
                                <i className="bi bi-cart-fill"></i>
                            </RedLink>
                        }
                        
                        <UserLinks className="me-3"/>
                        <LocaleChanger className="me-2 small rounded" />
                        <ThemeChanger />
                    </div>
                </div>
            </div>
        </header>
    );
}
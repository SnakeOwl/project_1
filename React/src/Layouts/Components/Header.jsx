import { Link } from "react-router-dom";
import Logo from "../../Components/Logo";
import UserLinks from "./Header/UserLinks";

export default function Header(){
    return (
        <header className="container py-3">
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
                    <UserLinks />
                </div>
            </div>
        </header>
    );
}
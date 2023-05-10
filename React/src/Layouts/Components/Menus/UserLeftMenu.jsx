import { useContext } from "react";
import { Link } from "react-router-dom";
import ContextGlobal from "/src/context/Global/ContextGlobal";

export default function UserLeftMenu(){
    const {stateGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    return (
        <div className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/user/" >{lang['personal orders']}</Link>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <Link to="/user/data" >{lang['personal data']}</Link>
            </li>
        </div>
    );
}
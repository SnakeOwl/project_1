import { Outlet } from 'react-router-dom';
import ILayout from './ILayout';

export default function Layout()
{
    return (
            <div className="row">
                <Outlet />
            </div>
    );
}
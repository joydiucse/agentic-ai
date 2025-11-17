import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar.jsx";
function Layout(props) {
    return (
        <div>
            <Sidebar />
            <div className="">
                <Outlet/>
            </div>
        </div>
    );
}

export default Layout;

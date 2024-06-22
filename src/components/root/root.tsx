import React from "react";
import NavigationBar from "../../../../jamming/src/components/NavigationBar/navigation-bar";
import { Outlet } from "react-router-dom";

const Root: React.FC = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    )
};

export default Root;
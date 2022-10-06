import React  from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import signOut from "./functions/cerrarSesion";
import classNames from 'classnames';

export const AppTopbar = (props) => {

    return (
        <div className="layout-topbar" >
            
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-fruteria.png' : 'assets/layout/images/logo-fruteria.png'} alt="logo" height= "80" />
            <Link to="/" className="layout-topbar-logo">
                <span >LUGO APP</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

                <ul className={classNames("layout-topbar-menu lg:flex origin-top", {'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })}>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar"/>
                            <span>Events</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog"/>
                            <span>Settings</span>
                        </button>
                    </li>
                    <li>
                        <button className="p-link layout-topbar-button" onClick={signOut}> Cerrar sesión
                            <i className="pi pi-user"/>
                            <span>Profile</span>
                        </button>
                    </li>
                </ul>
        </div>
    );
}

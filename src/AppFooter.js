import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo-dark.png' : 'assets/layout/images/logo-dark.png'} alt="Logo" height="70" className="mr-2" />
            by
            <span className="font-medium ml-2">Dev Tech Group</span>
        </div>
    );
}

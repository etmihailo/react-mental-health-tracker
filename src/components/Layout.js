import React from 'react';
import Menu from './Menu';

const Layout = ({children}) => {
    return (
        <div>
            <Menu/>
            <main style={{padding: '20px'}}>
                {children}
            </main>
        </div>
    );
};

export default Layout;

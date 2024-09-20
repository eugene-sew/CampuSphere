import React from 'react';
import { logo } from '../../assets';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-10 mr-2" /> 
                <h1 className="text-xl font-bold">CampuSphere</h1>
            </div>
        </header>
    );
};

export default Header;

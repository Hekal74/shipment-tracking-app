import React from 'react';
import logo from '../../../images/logo.png';

interface NavbarProps {
  toggleLanguage: () => void;
  toggleDarkMode: () => void;
  language: 'en' | 'ar';
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleLanguage, toggleDarkMode, language, darkMode }) => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        <div className="text-gray-700 flex items-center space-x-4">
          <button onClick={toggleLanguage} className="text-sm">{language === 'en' ? 'عربي' : 'English'}</button>
          <button onClick={toggleDarkMode} className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>

        <div className="text-red-600 font-bold text-xl">
          <img src={logo} alt="Bosta Logo" className="w-24" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

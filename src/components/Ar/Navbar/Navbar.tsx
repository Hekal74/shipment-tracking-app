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
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="container mx-auto px-4 py-3 flex justify-between items-center">

        

        <div className="text-red-600 font-bold text-xl ml-auto"> 
          <img src={logo} alt="Bosta Logo" className="w-24" />
        </div>
        <div className="text-gray-700 flex items-center space-x-4">
          <button onClick={toggleLanguage} className="text-sm">{language === 'en' ? 'عربي' : 'English'}</button>
          <button onClick={toggleDarkMode} className="text-sm pr-5">{darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

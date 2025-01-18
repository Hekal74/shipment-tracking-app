import React, { useState, useEffect } from 'react';
import location from '../../../images/location.png';
import search from '../../../images/search.png';

type SearchBarProps = {
  trackingNumber: string;
  setTrackingNumber: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (trackingNumber: string) => void;
  language: 'en' | 'ar';
};

const SearchBar: React.FC<SearchBarProps> = ({ trackingNumber, setTrackingNumber, onSearch, language }) => {
  const [inputValue, setInputValue] = useState(trackingNumber);

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue);
    } else {
      alert(language === 'en' ? "Please enter a tracking number." : "الرجاء إدخال رقم التتبع.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    setInputValue(trackingNumber);
  }, [trackingNumber]);

  return (
    <div className="text-center flex flex-col items-center">
      <img src={location} alt="location-logo" className="w-28 sm:w-20 lg:w-36 mb-4 mt-14" />
      <h2 className="text-3xl font-bold text-gray-700 mb-4">
        {language === 'en' ? "Track Your Order" : "تتبع طلبك"}
      </h2>
      <div className="mt-4 flex items-center border rounded-md shadow-sm w-full max-w-md">
        <button
          onClick={handleSearch}
          className="p-2 flex items-center justify-center rounded-l-md hover:bg-gray-200 transition-colors"
        >
          <img src={search} alt="search-logo" className="w-8 h-8" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={language === 'en' ? "Enter Tracking Number" : "أدخل رقم التتبع"}
          className="flex-grow p-2 border-none focus:outline-none text-gray-700 text-lg"
        />
      </div>
    </div>
  );
};

export default SearchBar;

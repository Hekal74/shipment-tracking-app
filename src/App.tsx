import React, { useState, Suspense, lazy } from 'react';
import SearchBar from './components/En/SearchBar/SearchBar';
import ShipmentDetails from './components/En/ShipmentDetails';
import DeliveryTimeline from './components/En/DeliveryTimeline/DeliveryTimeline';
import TrackingDetails from './components/En/TrackingDetails';

interface ShipmentDetailsType {
  shipmentId: string;
  status: string;
  orderNumber: string;
  arrivalDate: string;
  additionalInfo: string;
}

interface TimelineType {
  stages: string[];
  currentStage: number;
}

interface TrackingDetailType {
  date: string;
  time: string;
  description: string;
}

const App: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [shipmentDetails, setShipmentDetails] = useState<ShipmentDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));

  const Navbar = language === 'en'
    ? lazy(() => import('./components/En/Navbar/Navbar'))
    : lazy(() => import('./components/Ar/Navbar/Navbar'));

  const onSearch = (trackingNumber: string) => {
    if (!trackingNumber) {
      setError(language === 'en' ? 'Tracking number is required!' : 'رقم التتبع مطلوب!');
      return;
    }

    setLoading(true);
    setError('');

    fetch(`https://tracking.bosta.co/shipments/track/${trackingNumber}`, {
      method: 'GET',
      headers: {
        'x-requested-by': 'Bosta',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(language === 'en' ? 'Invalid tracking number or shipment not found!' : 'رقم التتبع غير صحيح أو الشحنة غير موجودة!');
        }
        return response.json();
      })
      .then(data => {
        setShipmentDetails(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message || (language === 'en' ? 'Failed to fetch shipment details.' : 'فشل في جلب تفاصيل الشحنة.'));
        setLoading(false);
      });
  };

  const timelineData: TimelineType = shipmentDetails ? {
    stages: language === 'en' 
      ? ["Ordered", "Shipped", "In Transit", "Out for Delivery", "Delivered"] 
      : ["تم الطلب", "تم الشحن", "في الطريق", "في طريقه للتوصيل", "تم التسليم"],
    currentStage: 2,
  } : { stages: [], currentStage: 0 };

  const trackingDetailsData: TrackingDetailType[] = shipmentDetails ? [
    { date: "2025-01-01", time: "10:00 AM", description: language === 'en' ? "Order placed" : "تم الطلب" },
    { date: "2025-01-02", time: "02:00 PM", description: language === 'en' ? "Shipment dispatched" : "تم الشحن" },
    { date: "2025-01-03", time: "09:00 AM", description: language === 'en' ? "In transit" : "في الطريق" },
    { date: "2025-01-03", time: "04:00 PM", description: language === 'en' ? "Out for delivery" : "في طريقه للتوصيل" },
    { date: "2025-01-03", time: "06:00 PM", description: language === 'en' ? "Delivered" : "تم التسليم" },
  ] : [];

  return (
    <div
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      className={`font-sans min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar toggleLanguage={toggleLanguage} toggleDarkMode={toggleDarkMode} language={language} darkMode={darkMode} />
      </Suspense>

      <main className="container mx-auto px-4 py-6">
        <SearchBar 
          trackingNumber={trackingNumber} 
          setTrackingNumber={setTrackingNumber} 
          onSearch={onSearch} 
          language={language} 
        />

        {loading && <div>{language === 'en' ? 'Loading shipment details...' : 'جاري تحميل تفاصيل الشحنة...'}</div>}
        {error && <div className="text-red-500">{error}</div>}

        {shipmentDetails && (
          <>
            <ShipmentDetails 
              shipmentDetails={shipmentDetails} 
              language={language} 
              trackingNumber={trackingNumber} 
            />
            <DeliveryTimeline timeline={timelineData} language={language} />
            <TrackingDetails trackingDetails={trackingDetailsData} language={language} />
          </>
        )}
      </main>
    </div>
  );
};

export default App;

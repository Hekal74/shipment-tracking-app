import React from 'react';

type ShipmentDetailsType = {
  shipmentId: string;
  status: string;
  orderNumber: string;
  arrivalDate: string;
  additionalInfo: string;
};

type ShipmentDetailsProps = {
  shipmentDetails: ShipmentDetailsType;
  language: 'en' | 'ar';
  trackingNumber: string; // Add this prop to get the tracking number
};

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({ shipmentDetails, language, trackingNumber }) => (
  <section className="bg-white shadow-md rounded-md p-4 my-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
    <h4 className="text-lg font-semibold text-gray-800">
      {language === 'en' ? 'Shipment Details' : 'تفاصيل الشحنة'}
    </h4>
    <div className="mt-4 text-gray-700">
      <div className="mb-2">
        <span className="font-semibold">{language === 'en' ? 'Shipment ID: ' : 'رقم الشحنة: '}</span>
        {shipmentDetails.shipmentId}
      </div>
      {/* Display the tracking number here */}
      <div className="mb-2">
        <span className="font-semibold">{language === 'en' ? 'Tracking Number: ' : 'رقم التتبع: '}</span>
        {trackingNumber} {/* Display the tracking number */}
      </div>
      <div className="mb-2">
        <span className="font-semibold">{language === 'en' ? 'Status: ' : 'الحالة: '}</span>
        {shipmentDetails.status}
      </div>
      <div className="mb-2">
        <span className="font-semibold">{language === 'en' ? 'Order Number: ' : 'رقم الطلب: '}</span>
        {shipmentDetails.orderNumber}
      </div>
      <div className="mb-2">
        <span className="font-semibold">{language === 'en' ? 'Arrival Date: ' : 'تاريخ الوصول: '}</span>
        {shipmentDetails.arrivalDate}
      </div>
      <div className="mb-2">
        <span className="font-semibold">{language === 'en' ? 'Additional Information: ' : 'معلومات إضافية: '}</span>
        {shipmentDetails.additionalInfo}
      </div>
    </div>
  </section>
);

export default ShipmentDetails;

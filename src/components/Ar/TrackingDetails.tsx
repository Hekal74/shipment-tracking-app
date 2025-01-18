import React from 'react';

type TrackingDetailType = {
  date: string;
  time: string;
  description: string;
};

type TrackingDetailsProps = {
  trackingDetails: TrackingDetailType[];
  language: 'en' | 'ar';
};

const TrackingDetails: React.FC<TrackingDetailsProps> = ({ trackingDetails, language }) => (
  <section className="bg-white shadow-md rounded-md p-4 my-6">
    <h4 className="text-lg font-semibold text-gray-800">
      {language === 'en' ? 'Tracking Details' : 'تفاصيل التتبع'}
    </h4>
    <ul className="mt-4">
      {trackingDetails.map((detail, index) => (
        <li key={index} className="mb-4">
          <p className="text-gray-600 font-semibold">{detail.date}</p>
          <p className="text-gray-500 text-sm">
            {detail.time} - {language === 'en' ? detail.description : `وصف: ${detail.description}`}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

export default TrackingDetails;

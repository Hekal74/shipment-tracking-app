import React from 'react';

export type TimelineType = {
  stages: string[];
  currentStage: number;
};

type DeliveryTimelineProps = {
  timeline: TimelineType;
  language: 'en' | 'ar';
};

const DeliveryTimeline: React.FC<DeliveryTimelineProps> = ({ timeline, language }) => (
  <section className="bg-white shadow-md rounded-md p-4 my-6">
    <div className="flex justify-between text-sm text-gray-500">
      {timeline.stages.map((stage, index) => (
        <div key={index} className={index <= timeline.currentStage ? 'text-blue-600' : ''}>
          {language === 'en' ? stage : `المرحلة: ${stage}`}
        </div>
      ))}
    </div>
    <div className="relative h-2 bg-gray-200 rounded-full my-2">
      <div
        className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full"
        style={{ width: `${((timeline.currentStage + 1) / timeline.stages.length) * 100}%` }}
      ></div>
    </div>
  </section>
);

export default DeliveryTimeline;

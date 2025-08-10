// Rights Progress component
"use client";

import React from 'react';

export default function RightsProgress() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Rights Education Progress</h3>
        <div className="mt-5">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">45% complete</p>
        </div>
      </div>
    </div>
  );
}
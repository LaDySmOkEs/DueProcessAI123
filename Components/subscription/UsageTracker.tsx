// Usage Tracker component
"use client";

import React from 'react';

export default function UsageTracker() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h4 className="text-sm font-medium text-gray-900">Usage This Month</h4>
      <div className="mt-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">API Calls</span>
          <span className="font-medium">1,234 / 5,000</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '25%' }}></div>
        </div>
      </div>
    </div>
  );
}
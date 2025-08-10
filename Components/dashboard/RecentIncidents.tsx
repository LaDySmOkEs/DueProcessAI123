// Recent Incidents component
"use client";

import React from 'react';

export default function RecentIncidents() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Incidents</h3>
        <div className="mt-5">
          <div className="text-sm text-gray-500">No recent incidents to display</div>
        </div>
      </div>
    </div>
  );
}
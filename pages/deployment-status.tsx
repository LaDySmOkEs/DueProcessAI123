/**
 * Deployment Status Page
 * This page shows the status of all directories in the deployment
 */

import React, { useState, useEffect } from 'react';

interface DirectoryInfo {
  name: string;
  exists: boolean;
  fileCount: number;
  type: 'main' | 'component';
}

interface DeploymentStatus {
  verified: boolean;
  directories: DirectoryInfo[];
  totalFiles: number;
  timestamp: string;
}

const DeploymentStatusPage: React.FC = () => {
  const [status, setStatus] = useState<DeploymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDeploymentStatus();
  }, []);

  const fetchDeploymentStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/deployment-status');
      if (!response.ok) {
        throw new Error('Failed to fetch deployment status');
      }
      const data = await response.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading deployment status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={fetchDeploymentStatus}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const mainDirectories = status?.directories.filter(d => d.type === 'main') || [];
  const componentDirectories = status?.directories.filter(d => d.type === 'component') || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Deployment Status
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              status?.verified 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <span className="text-xl">
                {status?.verified ? '✅' : '❌'}
              </span>
              <span className="font-semibold">
                {status?.verified ? 'All Directories Verified' : 'Issues Detected'}
              </span>
            </div>
            
            <div className="text-gray-600">
              Last checked: {status?.timestamp ? new Date(status.timestamp).toLocaleString() : 'Unknown'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{status?.directories.length || 0}</div>
              <div className="text-blue-800">Total Directories</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {status?.directories.filter(d => d.exists).length || 0}
              </div>
              <div className="text-green-800">Verified</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{status?.totalFiles || 0}</div>
              <div className="text-purple-800">Total Files</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Main Directories</h2>
            <div className="space-y-2">
              {mainDirectories.map((dir) => (
                <div key={dir.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {dir.exists ? '✅' : '❌'}
                    </span>
                    <span className="font-medium">{dir.name}</span>
                  </div>
                  <span className="text-gray-600">{dir.fileCount} files</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Component Subdirectories</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {componentDirectories.map((dir) => (
                <div key={dir.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {dir.exists ? '✅' : '❌'}
                    </span>
                    <span className="font-medium">{dir.name}</span>
                  </div>
                  <span className="text-gray-600">{dir.fileCount} files</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Deployment Information</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Purpose:</strong> This page verifies that all repository directories are accessible in the deployed application.
            </p>
            <p>
              <strong>Verification Method:</strong> The API endpoint checks filesystem access to all required directories at runtime.
            </p>
            <p>
              <strong>Build Integration:</strong> Run <code className="bg-gray-100 px-2 py-1 rounded">npm run verify-deployment</code> to verify before deployment.
            </p>
            <p>
              <strong>Automatic Updates:</strong> Directory structure is automatically detected and verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentStatusPage;
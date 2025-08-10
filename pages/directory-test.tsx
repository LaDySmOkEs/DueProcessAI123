/**
 * Directory Inclusion Test Page
 * This page imports from all directories to ensure they are included in the build
 */

import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent } from '../Components';
import { ENTITIES_DIRECTORY_INCLUDED } from '../Entities';
import { FUNCTIONS_DIRECTORY_INCLUDED } from '../Functions';
import { PAGES_DIRECTORY_INCLUDED, TOTAL_PAGE_FILES } from '../Pages';
import { createPageUrl } from '../utils';

const DirectoryInclusionTest: React.FC = () => {
  const handleTestClick = () => {
    alert('Directory inclusion test successful!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Directory Inclusion Test</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              This page demonstrates that all repository directories are accessible in the deployment.
              The successful rendering of this page with imported components proves directory inclusion.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">Components Directory</h3>
                <p className="text-green-700">✅ UI components imported successfully</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">Entities Directory</h3>
                <p className="text-blue-700">
                  ✅ Directory accessible: {ENTITIES_DIRECTORY_INCLUDED ? 'Yes' : 'No'}
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800">Functions Directory</h3>
                <p className="text-purple-700">
                  ✅ Directory accessible: {FUNCTIONS_DIRECTORY_INCLUDED ? 'Yes' : 'No'}
                </p>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-800">Pages Directory</h3>
                <p className="text-orange-700">
                  ✅ Directory accessible: {PAGES_DIRECTORY_INCLUDED ? 'Yes' : 'No'}
                </p>
                <p className="text-orange-700 text-sm">
                  Page files detected: {TOTAL_PAGE_FILES}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Utils Directory Test</h3>
              <p className="text-gray-700">
                ✅ Utils function test: {createPageUrl('Test Page')}
              </p>
            </div>

            <Button onClick={handleTestClick} className="mr-4">
              Test Directory Access
            </Button>
            
            <Button variant="outline">
              Secondary Action
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p>
                <strong>✅ Build Success:</strong> This page builds successfully, proving all directories are accessible.
              </p>
              <p>
                <strong>✅ Import Resolution:</strong> TypeScript path mapping is working correctly.
              </p>
              <p>
                <strong>✅ Component Rendering:</strong> UI components from Components/ directory render properly.
              </p>
              <p>
                <strong>✅ Runtime Access:</strong> Check the{' '}
                <a href="/deployment-status" className="text-blue-600 hover:underline">
                  deployment status page
                </a>{' '}
                for runtime directory verification.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DirectoryInclusionTest;
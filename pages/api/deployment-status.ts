/**
 * API endpoint to verify directory accessibility in deployment
 * GET /api/deployment-status
 */

import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';

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

const REQUIRED_DIRECTORIES = [
  'Components',
  'Entities',
  'Functions', 
  'Pages',
  'app',
  'pages',
  'utils'
];

const COMPONENT_SUBDIRS = [
  'anti-despotism',
  'courtroomsimulator', 
  'dashboard',
  'diagnostic',
  'documentanalyzer',
  'legal',
  'legaldraftsman',
  'rights',
  'self-litigant',
  'subscription',
  'ui'
];

function checkDirectory(dirPath: string): { exists: boolean; fileCount: number } {
  try {
    const stats = fs.statSync(dirPath);
    if (!stats.isDirectory()) {
      return { exists: false, fileCount: 0 };
    }
    
    const files = fs.readdirSync(dirPath);
    const fileCount = files.filter(file => {
      const filePath = path.join(dirPath, file);
      return fs.statSync(filePath).isFile();
    }).length;
    
    return { exists: true, fileCount };
  } catch (error) {
    return { exists: false, fileCount: 0 };
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeploymentStatus>
) {
  if (req.method !== 'GET') {
    res.status(405).json({
      verified: false,
      directories: [],
      totalFiles: 0,
      timestamp: new Date().toISOString()
    });
    return;
  }

  const directories: DirectoryInfo[] = [];
  let allVerified = true;

  // Check main directories
  for (const dir of REQUIRED_DIRECTORIES) {
    const { exists, fileCount } = checkDirectory(dir);
    
    directories.push({
      name: dir,
      exists,
      fileCount,
      type: 'main'
    });
    
    if (!exists) {
      allVerified = false;
    }
  }

  // Check component subdirectories
  for (const subdir of COMPONENT_SUBDIRS) {
    const dirPath = path.join('Components', subdir);
    const { exists, fileCount } = checkDirectory(dirPath);
    
    directories.push({
      name: `Components/${subdir}`,
      exists,
      fileCount,
      type: 'component'
    });
    
    if (!exists) {
      allVerified = false;
    }
  }

  const totalFiles = directories.reduce((sum, dir) => sum + dir.fileCount, 0);

  res.status(200).json({
    verified: allVerified,
    directories,
    totalFiles,
    timestamp: new Date().toISOString()
  });
}
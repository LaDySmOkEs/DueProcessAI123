#!/usr/bin/env node

/**
 * Deployment Directory Verification Script
 * 
 * This script verifies that all directories in the repository
 * are properly accessible and can be included in deployment.
 */

const fs = require('fs');
const path = require('path');

// Directories that should be included in deployment
const REQUIRED_DIRECTORIES = [
  'Components',
  'Entities', 
  'Functions',
  'Pages',
  'app',
  'pages',
  'utils'
];

// Component subdirectories
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

function checkDirectoryExists(dirPath) {
  try {
    const stats = fs.statSync(dirPath);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

function countFiles(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files.filter(file => {
      const filePath = path.join(dirPath, file);
      return fs.statSync(filePath).isFile();
    }).length;
  } catch (error) {
    return 0;
  }
}

function verifyDirectories() {
  console.log('🔍 Verifying deployment directory inclusion...\n');
  
  let allVerified = true;
  const results = [];

  // Check main directories
  for (const dir of REQUIRED_DIRECTORIES) {
    const exists = checkDirectoryExists(dir);
    const fileCount = exists ? countFiles(dir) : 0;
    
    results.push({
      directory: dir,
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
    const exists = checkDirectoryExists(dirPath);
    const fileCount = exists ? countFiles(dirPath) : 0;
    
    results.push({
      directory: `Components/${subdir}`,
      exists,
      fileCount,
      type: 'component'
    });
    
    if (!exists) {
      allVerified = false;
    }
  }

  // Display results
  console.log('📁 Main Directories:');
  results.filter(r => r.type === 'main').forEach(result => {
    const status = result.exists ? '✅' : '❌';
    console.log(`  ${status} ${result.directory} (${result.fileCount} files)`);
  });

  console.log('\n🧩 Component Subdirectories:');
  results.filter(r => r.type === 'component').forEach(result => {
    const status = result.exists ? '✅' : '❌';
    console.log(`  ${status} ${result.directory} (${result.fileCount} files)`);
  });

  // Summary
  const totalDirectories = results.length;
  const verifiedDirectories = results.filter(r => r.exists).length;
  const totalFiles = results.reduce((sum, r) => sum + r.fileCount, 0);

  console.log('\n📊 Summary:');
  console.log(`  Directories verified: ${verifiedDirectories}/${totalDirectories}`);
  console.log(`  Total files found: ${totalFiles}`);
  console.log(`  All directories accessible: ${allVerified ? '✅ YES' : '❌ NO'}`);

  return allVerified;
}

// Check if index files exist for proper exports
function verifyIndexFiles() {
  console.log('\n📄 Verifying index files for deployment inclusion...\n');
  
  const indexFiles = [
    'Components/index.ts',
    'Entities/index.ts',
    'Functions/index.ts',
    'Pages/index.ts',
    'utils/index.ts'
  ];

  indexFiles.forEach(indexFile => {
    const exists = fs.existsSync(indexFile);
    const status = exists ? '✅' : '❌';
    console.log(`  ${status} ${indexFile}`);
  });
}

// Run verification
if (require.main === module) {
  const directoriesVerified = verifyDirectories();
  verifyIndexFiles();
  
  console.log('\n🚀 Deployment Readiness:');
  if (directoriesVerified) {
    console.log('  ✅ All directories are accessible and ready for deployment');
    process.exit(0);
  } else {
    console.log('  ❌ Some directories are missing or inaccessible');
    process.exit(1);
  }
}

module.exports = { verifyDirectories, verifyIndexFiles };
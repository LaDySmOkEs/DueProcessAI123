#!/bin/bash

# Deployment Readiness Validation Script for DueProcessAI123
# This script validates that the project is ready for deployment

echo "🚀 Deployment Readiness Check for DueProcessAI123"
echo "=================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Found package.json"

# Check Node.js version
echo "📦 Checking Node.js version..."
node_version=$(node --version)
echo "   Node.js version: $node_version"

# Check npm version  
echo "📦 Checking npm version..."
npm_version=$(npm --version)
echo "   npm version: $npm_version"

# Install dependencies
echo "📦 Installing dependencies..."
if npm install --silent; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Run linting
echo "🔍 Running ESLint..."
if npm run lint --silent; then
    echo "✅ Code linting passed"
else
    echo "❌ Code linting failed"
    exit 1
fi

# Run build
echo "🏗️  Building project..."
if npm run build --silent; then
    echo "✅ Build completed successfully"
else
    echo "❌ Build failed"
    exit 1
fi

# Check for essential files
echo "📋 Checking deployment files..."

# Check for .env.example
if [ -f ".env.example" ]; then
    echo "✅ .env.example found"
else
    echo "⚠️  .env.example not found - consider adding environment variables documentation"
fi

# Check for vercel.json
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json found"
else
    echo "⚠️  vercel.json not found - Vercel deployment may not be optimized"
fi

# Check for README.md
if [ -f "README.md" ]; then
    echo "✅ README.md found"
else
    echo "⚠️  README.md not found - consider adding project documentation"
fi

# Check build output
if [ -d ".next" ]; then
    echo "✅ .next build directory created"
    
    # Check static files
    if [ -d ".next/static" ]; then
        echo "✅ Static assets generated"
    else
        echo "⚠️  Static assets directory not found"
    fi
else
    echo "❌ .next build directory not found"
    exit 1
fi

# Test production server start (just validate it starts)
echo "🌐 Testing production server startup..."
timeout 10s npm start > /dev/null 2>&1 &
server_pid=$!
sleep 3

if kill -0 $server_pid 2>/dev/null; then
    echo "✅ Production server started successfully"
    kill $server_pid 2>/dev/null
else
    echo "❌ Production server failed to start"
    exit 1
fi

echo ""
echo "🎉 Deployment readiness check completed successfully!"
echo ""
echo "Next steps for deployment:"
echo "  • For Vercel: Connect your GitHub repo to Vercel"
echo "  • For Netlify: Connect your repo or drag and drop the .next folder"
echo "  • For traditional hosting: Run 'npm start' on your server"
echo ""
echo "Environment setup:"
echo "  • Copy .env.example to .env.local and fill in your values"
echo "  • Set NODE_ENV=production for production deployments"
#!/bin/bash

# Start script for Livingston Craft Landing Page
# This script installs dependencies (if needed) and starts the development server

set -e

echo "🚀 Starting Livingston Craft Landing Page..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the development server
echo "🔧 Starting Next.js development server..."
echo "📍 Server will be available at http://localhost:3000"
echo ""

npm run dev

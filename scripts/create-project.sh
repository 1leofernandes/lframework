#!/bin/bash

# Script to create a new project based on LS Framework

echo "Creating new project from LS Framework..."

# Get project name
read -p "Enter project name: " PROJECT_NAME

# Create project directory
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Copy framework structure
cp -r ../backend ./backend
cp -r ../frontend ./frontend
cp -r ../shared ./shared
cp ../package.json ./

# Initialize git
git init

# Install dependencies
echo "Installing backend dependencies..."
cd backend && npm install

echo "Installing frontend dependencies..."
cd ../frontend && npm install

echo "Installing root dependencies..."
cd .. && npm install

echo "Project $PROJECT_NAME created successfully!"
echo "Run 'npm run dev:backend' and 'npm run dev:frontend' to start development."

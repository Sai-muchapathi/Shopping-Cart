#!/bin/bash

# Navigate to the project directory
cd ../practice || exit

# Install dependencies
npm install

# Build production bundle
npm run build

#!/bin/zsh

# Set the PATH to include Homebrew and other common locations
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

# Navigate to the project directory
PROJECT_DIR="/Users/roeea/Documents/web Parser/michel-law-site"
cd "$PROJECT_DIR"

# Run the dev server
# You can change this to 'npm run preview' or 'npm run build' as needed
npm run dev

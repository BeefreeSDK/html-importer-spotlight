#!/bin/zsh

# Terminal colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print colorful banner
echo "${PURPLE}"
echo "┌─────────────────────────────────────────────┐"
echo "│                                             │"
echo "│   🐝 BeeFree HTML Email Importer Demo       │"
echo "│                                             │"
echo "└─────────────────────────────────────────────┘"
echo "${NC}"

# Check if .env exists
if [ ! -f .env ]; then
    echo "${YELLOW}⚠️  No .env file found. Creating from template...${NC}"
    cp .env.example .env
    echo "${YELLOW}⚠️  Please edit the .env file with your API credentials before continuing.${NC}"
    echo "Press any key to open .env file for editing, or Ctrl+C to exit"
    read -k1
    open .env
    exit 0
fi

# Build and start the server
echo "${BLUE}📦 Building TypeScript files...${NC}"
npm run build

echo "${GREEN}🚀 Starting demo server...${NC}"
echo "${BLUE}📝 The demo will be available at: ${GREEN}http://localhost:3001${NC}"
echo "${YELLOW}Press Ctrl+C to stop the demo server${NC}"
echo ""

# Start the server
npm start
#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")/.."

# Log start time
echo "Starting YC Data Update at $(date)" >> logs/yc_scraper.log

# Run the Python scraper
# Ensure python3 and requests are installed. 
# If you use a virtual environment, activate it here: source venv/bin/activate
python3 scripts/fetch_yc_data.py >> logs/yc_scraper.log 2>&1

# Log end time
echo "Finished YC Data Update at $(date)" >> logs/yc_scraper.log

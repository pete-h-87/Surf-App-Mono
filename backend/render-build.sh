#!/usr/bin/env bash
# Exit on error
set -o errexit

npm install
# npm run build # Uncomment if required

# Ensure the Puppeteer cache directory exists
mkdir -p $PUPPETEER_CACHE_DIR

# Store/pull Puppeteer cache with build cache
if [[ ! -d $PUPPETEER_CACHE_DIR ]]; then 
  echo "...Copying Puppeteer Cache from Build Cache" 
  cp -R $XDG_CACHE_HOME/puppeteer/ $PUPPETEER_CACHE_DIR
else 
  echo "...Storing Puppeteer Cache in Build Cache" 
  cp -R $PUPPETEER_CACHE_DIR $XDG_CACHE_HOME
fi
#!/bin/bash

# This script will update the blog posts to essay style
# Run with: bash update_blogs.sh

echo "Updating blog posts to essay style..."
echo "Please manually update the three blog post content fields in:"
echo "app/blog/[slug]/page.tsx"
echo ""
echo "Replace the content between backticks for each blog post:"
echo ""
echo "1. 'autonomous-swarm-coordination' - lines 28-184"
echo "2. 'algorithmic-warfare-future' - lines 195-383"  
echo "3. 'open-architecture-defense' - lines 394-636"
echo ""
echo "Use flowing narrative paragraphs instead of headers and bullets."
echo "See BLOG_ESSAY_STYLE_GUIDE.md for examples."

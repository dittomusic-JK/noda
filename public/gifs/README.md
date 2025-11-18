# Tactical GIFs Directory

This directory should contain the tactical/military themed GIF animations used in the capabilities section.

## Required GIFs:

1. **coverage_animation.gif** - Area coverage and zone control visualization
2. **formation_control.gif** - UAV formation control demonstration
3. **relay_uav_animation.gif** - Autonomous relay network visualization

## Temporary Placeholders

Until you add the actual GIF files, the site will show broken image links. You can:

1. Add your actual tactical GIFs here with the filenames above
2. Replace with placeholder images temporarily
3. Or update the image paths in `components/sections/CapabilitiesSection.tsx`

## GIF Specifications

- **Format**: Animated GIF or MP4 video
- **Dimensions**: 16:9 aspect ratio (e.g., 1280x720px or 1920x1080px)
- **File Size**: Optimize to < 5MB each for performance
- **Content**: Military/tactical themed visualizations showing:
  - Drone formations and movements
  - Coverage patterns with terrain
  - Communication relay networks
  - Geometric grid overlays
  - 80s military command aesthetic

## Optimization Tips

1. Use tools like ezgif.com to compress GIFs
2. Reduce frame rate if needed (15-20 fps is often sufficient)
3. Consider using MP4 with `<video>` tags for better compression
4. Add lazy loading for better initial page load

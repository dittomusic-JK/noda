# Design Migration - Gambit-Inspired Updates

**Date:** November 24, 2025  
**Objective:** Transform NODA AI's design from consumer-friendly tech to bold, military-grade visual language inspired by Gambit.us

## Client Requirements

Based on client feedback:
- **No rounded corners** - Replace with sharp 90° angles throughout
- **Bold, uppercase typography** - Medium to bold weights, all caps for impact
- **Desktop-centric aesthetic** - Military/government desktop application feel, not mobile-first softness
- **"Toughened and spartan"** - Think defense contractors, not consumer apps
- **More visual, less technical** - Show don't tell with striking imagery
- **Dynamic scrolling** - Progressive disclosure creates excitement

## Changes Implemented

### 1. Component Library - Sharp Edges ✅

**Files Modified:**
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/badge.tsx`
- `components/ui/accordion.tsx`

**Changes:**
- Removed all `rounded-lg`, `rounded-xl`, `rounded-full` classes
- Updated to sharp rectangular borders
- Changed font weights from 400-600 to 700 (bold)
- Added `uppercase` and `tracking-wide` to buttons and badges

**Before:**
```tsx
const baseStyles = 'rounded-lg font-semibold'
```

**After:**
```tsx
const baseStyles = 'font-bold uppercase tracking-wide'
```

### 2. Global Typography - Bold & Uppercase ✅

**Files Modified:**
- `app/globals.css`
- `app/components.css`

**Changes:**
- All headings now `font-weight: 700` (bold)
- All headings now `text-transform: uppercase`
- Increased letter-spacing to `0.02em - 0.05em` for impact
- Tightened line-heights from 1.4 to 1.1-1.2 for density

**Affected Elements:**
- `h1, h2, h3, h4, h5, h6` - Global bold uppercase treatment
- `.hero-headline` - Bold, uppercase, tight spacing
- `.statement-text` - Bold, uppercase for maximum impact
- `.section-header-minimal h2` - Bold, uppercase
- `.final-cta-wrapper h2` - Bold, uppercase

### 3. CSS Border-Radius Removal ✅

**Files Modified:**
- `app/components.css` (all border-radius removed)
- `app/tactical.css` (all border-radius removed)

**Method:** Used `sed` to strip all `border-radius` declarations:
```bash
sed -i '' 's/border-radius: [^;]*;//g' app/components.css
sed -i '' 's/border-radius: [^;]*;//g' app/tactical.css
```

**Result:** All cards, buttons, badges, containers now have sharp 90° corners.

### 4. Scroll Animation System ✅

**New File Created:**
- `components/animations/ScrollReveal.tsx`

**Features:**
- `gambit-reveal` - Dramatic scale + fade (like Gambit's hero images)
- `slide-left` - Text blocks slide in from left
- `slide-right` - Images slide in from right
- `parallax` - Slow background motion on scroll
- `fade-up` - Standard fade up (existing behavior)

**Enhanced Animation Library:**
- `lib/animations.ts` - Added new animation patterns to existing GSAP setup

**Usage Example:**
```tsx
import { ScrollReveal } from '@/components/animations/ScrollReveal';

<ScrollReveal type="gambit-reveal" delay={200}>
  <img src="/hero-image.jpg" alt="Mission" />
</ScrollReveal>
```

### 5. TypeScript Fixes ✅

**Files Fixed:**
- `components/sections/CanyonMetricsSection.tsx`
- `components/sections/CanyonMetricsSection.new.tsx`

**Issue:** `useRef` required initial value for React 19
**Fix:** Changed from `useRef<Type>()` to `useRef<Type | null>(null)`

## Visual Impact Summary

### Before (Consumer-Friendly Tech)
- Soft rounded corners everywhere (8px-12px border-radius)
- Light font weights (400-500)
- Mixed case typography
- Friendly, approachable aesthetic
- Gradual, subtle animations

### After (Military-Grade Bold)
- **Sharp 90° corners throughout**
- **Bold typography (700 weight)**
- **Uppercase for impact**
- **Desktop-centric, professional**
- **Dramatic scroll reveals**

## How to Use New Patterns

### 1. Creating New Buttons
```tsx
<Button variant="primary" size="md">
  Deploy System {/* Automatically uppercase, bold, no rounded corners */}
</Button>
```

### 2. Creating New Cards
```tsx
<Card className="border-2"> {/* Sharp corners, no border-radius */}
  <CardHeader>Mission Brief</CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### 3. Adding Scroll Animations
```tsx
// Dramatic image reveal (Gambit-style)
<ScrollReveal type="gambit-reveal">
  <img src="/mission.jpg" className="w-full" />
</ScrollReveal>

// Text sliding in
<ScrollReveal type="slide-left">
  <h2>OPERATIONAL CAPABILITIES</h2>
  <p>Description...</p>
</ScrollReveal>

// Parallax background
<ScrollReveal type="parallax" className="absolute inset-0">
  <div className="bg-tactical-overlay" />
</ScrollReveal>
```

### 4. Data Attributes (Existing Pattern)
You can still use data attributes for animations:
```tsx
<div data-aos="gambit-reveal" data-aos-delay="300">
  <YourContent />
</div>
```

## Next Steps (Content Strategy)

### Remaining TODO: Visual Storytelling
The last remaining item is shifting from technical specs to visual storytelling:

**Current State:**
- Heavy text explanations
- Technical specifications upfront
- Feature lists

**Target State (Like Gambit):**
- Large, striking images dominate
- Minimal text overlays
- Visual hierarchy tells the story
- Technical details are secondary

**Recommended Actions:**
1. **Audit use cases pages** - Identify text-heavy sections
2. **Source high-quality imagery** - Defense operations, drone footage, tactical scenarios
3. **Reduce copy by 50%** - Keep headlines bold, descriptions concise
4. **Add more visual breaks** - Full-width images between sections
5. **Implement image-first layout** - Images above fold, specs below

## Testing

Run these commands to verify changes:
```bash
npm run type-check  # ✅ Passes
npm run lint        # Should pass
npm run dev         # Visual inspection on port 3003
```

## Browser Testing Checklist

- [ ] Chrome - Verify sharp corners render correctly
- [ ] Safari - Check uppercase typography doesn't break layout
- [ ] Firefox - Verify scroll animations perform smoothly
- [ ] Mobile - Ensure bold typography is readable at small sizes

## Performance Notes

- GSAP animations are performant (already installed)
- No additional bundle size from typography changes
- Sharp corners reduce CSS complexity (removed border-radius calculations)

## Design Tokens Reference

The design now aligns with these values:

```css
/* Typography */
--font-weight-bold: 700
--letter-spacing-tight: 0.02em
--letter-spacing-wide: 0.05em
--line-height-tight: 1.1

/* Borders */
--border-radius: 0 /* All removed */
--border-style: solid
--border-width: 1px-2px

/* Animation Timing */
--scroll-reveal-duration: 0.8-1.2s
--scroll-reveal-ease: power3.out / power4.out
```

## References

- **Gambit.us** - Primary design inspiration
- **Client Feedback** - "Toughened and spartan" aesthetic
- **Existing tactical.css** - Military color palette maintained

---

**Status:** Core design migration complete ✅  
**Remaining:** Content strategy shift to visual storytelling (requires content audit and asset sourcing)

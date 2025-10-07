# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern web application for "医美神话叙事学 - 如何发现美以及如何讲述美" (Medical Aesthetics Mythology and Narratology - How to Discover and Tell the Story of Beauty). It's a 150,000-word e-book with integrated AI chat, image generation, and interactive features.

**Target Audience**: Female users interested in medical aesthetics
**Design Philosophy**: Elegant, neutral, professional yet approachable

## Architecture

### File Structure
- `index.html` - Main HTML with all page sections (home, chat, image generation, history, guide, about)
- `style.css` - Complete styling with 6 theme variations and responsive design
- `outline.js` - Book outline data (10 chapters, 150K words) and rendering logic
- `app.js` - Application state management, UI interactions, AI integration points

### Key Design Patterns

**Mobile-First Responsive Design**
- Mobile: Primary focus
- Tablet/Desktop: Secondary optimization
- CSS uses mobile-first media queries
- Viewport height handling for iOS Safari (`--vh` custom property)

**State Management**
```javascript
const AppState = {
    currentPage: 'home',
    currentTheme: 'elegant-gray',
    fontSize: 'medium',
    aiStyle: 'standard',
    aiLength: 'concise',
    chatHistory: [],
    imageHistory: [],
    currentSelection: null
};
```

**localStorage Keys**
- `medbeauty_theme` - Selected color theme
- `medbeauty_font_size` - Font size (small/medium/large)
- `medbeauty_ai_style` - AI output style
- `medbeauty_ai_length` - AI output length
- `medbeauty_chat_history` - Chat history (max 50)
- `medbeauty_image_history` - Image generation history (max 30)

### Page Navigation System

Pages are managed via `.page` divs with `.active` class:
- `homePage` - Book outline display
- `chatPage` - AI chat interface
- `imagePage` - Image generation (nano banana model)
- `historyPage` - Chat and image history
- `guidePage` - User guide
- `aboutPage` - About and contact info

Navigation triggered by:
- Header buttons (`.nav-btn`)
- Footer buttons (`.footer-btn`)
- `navigateToPage(pageName)` function

## Theme System

### 6 Color Themes
1. **elegant-gray** (default) - Neutral professional
2. **warm-rose** - Warm feminine
3. **mint-fresh** - Cool refreshing
4. **lavender-dream** - Soft dreamy
5. **pearl-white** - Clean minimal
6. **coral-pink** - Vibrant warm

Each theme defines CSS custom properties:
```css
--color-primary
--color-primary-light
--color-primary-dark
--color-accent
--color-accent-2
--color-bg
--color-bg-secondary
--color-surface
--color-text
--color-text-secondary
--color-text-tertiary
--color-border
--color-hover
```

Apply theme: `document.documentElement.setAttribute('data-theme', themeName)`

## AI Integration Points

### Chat Function (iOS Compatible)
Location: `app.js` - `callAIAPI(prompt, type)`

**CRITICAL iOS Compatibility**:
- Use `fetch` API, NOT XMLHttpRequest
- Return Promise, use async/await
- Handle errors gracefully
- Show loading state during API calls

```javascript
async function callAIAPI(prompt, type = 'chat') {
    // Replace with actual API endpoint
    const response = await fetch('YOUR_AI_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            prompt,
            style: AppState.aiStyle,
            length: AppState.aiLength,
            type
        })
    });
    return (await response.json()).response;
}
```

**AI Configuration**:
- Style: `casual` (轻松幽默) / `standard` (标准日常) / `scientific` (科学严谨)
- Length: `detailed` (详细) / `standard` (标准) / `concise` (简约)

### Image Generation (nano banana model)
Location: `app.js` - `generateImage()`

Integrate nano banana model API here. Show result in `#imageResult` div.

### Text Selection AI (划词功能)
Location: `app.js` - `setupTextSelection()`

Actions:
- `explain` - Explain selected text
- `expand` - Expand on selected text
- `analyze` - Analyze selected text

Only works on `.message.assistant` elements.

## Markdown Rendering

Location: `app.js` - `renderMarkdown(text)`

Current implementation is basic. Supports:
- Headings (#, ##, ###)
- Bold (**text**)
- Italic (*text*)
- Lists (-)
- Paragraphs

**Enhancement Needed**: Consider integrating `marked.js` for full Markdown support.

## Export Functionality

### PNG Export
Requires: `html2canvas` library
Target element: `#imageResult`

### PDF Export
Requires: `jsPDF` + `html2canvas`
Target element: `#imageResult`

Add to index.html:
```html
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
```

## Book Outline Structure

Location: `outline.js` - `bookOutline` object

```javascript
{
    title: string,
    totalWords: 150000,
    chapters: [
        {
            id: number,
            title: string,
            wordCount: number,
            sections: [
                {
                    number: string,
                    title: string,
                    description: string,
                    keyPoints: string[]
                }
            ]
        }
    ]
}
```

**Interaction**:
- Chapters are collapsible (click `.chapter-header`)
- First chapter expanded by default
- Toggle uses `.expanded` class

## iOS-Specific Optimizations

**Prevent Double-Tap Zoom**:
```javascript
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
});
```

**Viewport Height Fix**:
```javascript
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
```

Called on: `resize`, `orientationchange`

## Visual Design Guidelines

### Typography
- Primary: `Noto Sans SC`
- Serif: `Noto Serif SC` (for headings)
- Base size: 16px (customizable)

### Icons
- Library: Remix Icon (`remixicon.css`)
- Style: Line icons (`.ri-*-line`)
- Usage: Decorative and functional UI elements

### SVG Decorations
Thin, minimalist lines. Example:
```html
<svg width="100%" height="2" viewBox="0 0 300 2">
    <line x1="0" y1="1" x2="300" y2="1"
          stroke="currentColor" stroke-width="1" opacity="0.3"/>
</svg>
```

### Spacing & Layout
Uses CSS custom properties:
- `--spacing-xs` (4px)
- `--spacing-sm` (8px)
- `--spacing-md` (16px)
- `--spacing-lg` (24px)
- `--spacing-xl` (32px)

### Animations
- Transition speeds: `--transition-fast` (0.15s), `--transition-base` (0.3s), `--transition-slow` (0.5s)
- Fade-in on page change
- Smooth hover effects

## Common Development Tasks

### Adding a New Theme
1. Add theme colors in `style.css`:
```css
[data-theme="new-theme"] {
    --color-primary: #...;
    /* ... other variables */
}
```
2. Add button in settings panel:
```html
<button class="theme-btn" data-theme="new-theme">New Theme</button>
```

### Modifying Book Content
1. Edit `outline.js` - `bookOutline.chapters` array
2. Run `renderOutline()` to update display

### Adding Suggested Questions
Edit `generateSuggestedQuestions()` in `app.js`:
```javascript
const questions = [
    '新问题1',
    '新问题2',
    // ...
];
```

### History Management
- Max chat history: 50 items
- Max image history: 30 items
- Auto-saved to localStorage
- Display updated via `updateHistoryDisplay()`

## Company Information

**Company**: 重庆联合丽格科技有限公司
**Address**: 重庆市渝中区临江支路28号
**Email**: yuxiaodong@beaucare.org
**Phone**: 023-63326559
**ICP**: 渝ICP备2024023473号

**Assets**:
- Logo: `https://docs.bccsw.cn/logo.png`
- Favicon: `https://docs.bccsw.cn/favicon.png`
- QR Code: `https://docs.bccsw.cn/images/dr-he/dr-he-brcode.png`
- QR Link: `https://work.weixin.qq.com/kfid/kfc193e1c58e9c203c2`

## Testing Checklist

Before deployment, verify:
- [ ] All themes switch correctly
- [ ] Font sizes apply properly
- [ ] AI settings persist in localStorage
- [ ] Chat history saves and loads
- [ ] Image history saves and loads
- [ ] Page navigation works on all buttons
- [ ] Settings panel opens/closes
- [ ] Text selection popup appears on assistant messages
- [ ] Mobile responsive layout works
- [ ] iOS Safari compatibility (no zoom, correct height)
- [ ] All external links work (logo, favicon, QR code, ICP)

## Future Integration Checklist

- [ ] Integrate real AI API in `callAIAPI()`
- [ ] Integrate nano banana image generation API
- [ ] Add `html2canvas` for PNG export
- [ ] Add `jsPDF` for PDF export
- [ ] Consider `marked.js` for better Markdown rendering
- [ ] Add error boundary for API failures
- [ ] Implement retry logic for failed requests
- [ ] Add analytics tracking (optional)

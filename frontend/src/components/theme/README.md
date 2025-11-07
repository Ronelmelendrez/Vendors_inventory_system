# Dark Mode / Theme System

A comprehensive dark mode implementation with localStorage persistence and smooth transitions throughout the application.

## Features

### Theme Modes
- **Light Mode**: Default bright theme with gray-50 backgrounds
- **Dark Mode**: Dark theme with gray-900 backgrounds
- **Auto-detect**: Respects system preference on first visit
- **Persistent**: Saves user's choice to localStorage
- **Smooth Transitions**: 0.3s ease transitions between modes

### Toggle Options
- **Settings Page**: Theme toggle in Appearance section
- **Icon Indicator**: Sun icon for light mode, Moon icon for dark mode
- **Visual Feedback**: Clear button states and hover effects

## Implementation

### ThemeContext
Provides global theme state management:

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### ThemeProvider
Wrap your app with ThemeProvider:

```tsx
<ThemeProvider>
  <YourApp />
</ThemeProvider>
```

### Dark Mode Classes
Use Tailwind's dark: variant:

```tsx
<div className="bg-white dark:bg-gray-800">
  <h1 className="text-gray-900 dark:text-gray-100">Title</h1>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
</div>
```

## Color Palette

### Light Mode
- Background: `#ffffff` (white)
- Foreground: `#171717` (gray-900)
- Secondary Background: `#f9fafb` (gray-50)
- Borders: `#d1d5db` (gray-300)
- Text Primary: `#111827` (gray-900)
- Text Secondary: `#6b7280` (gray-500)

### Dark Mode
- Background: `#0a0a0a` (near black)
- Foreground: `#ededed` (gray-100)
- Secondary Background: `#1f2937` (gray-800)
- Borders: `#374151` (gray-700)
- Text Primary: `#f3f4f6` (gray-100)
- Text Secondary: `#9ca3af` (gray-400)

## Components with Dark Mode

### Settings Page (`/settings`)
- ✅ Profile Information form
- ✅ Password Change section
- ✅ Account Settings section
- ✅ Theme Toggle button

### Forms & Inputs
- ✅ Text inputs with dark backgrounds
- ✅ Select dropdowns
- ✅ Buttons (primary, secondary)
- ✅ Labels and placeholders

### Cards & Containers
- ✅ White/dark-800 backgrounds
- ✅ Gray-300/gray-700 borders
- ✅ Shadow adjustments

## Usage

### Toggle Theme
Click the theme toggle button in Settings > Appearance section:
- **Light Mode** → Shows Moon icon + "Dark Mode" text
- **Dark Mode** → Shows Sun icon + "Light Mode" text

### System Preference
On first visit, the theme follows your system preference:
- If OS is in dark mode → App loads in dark mode
- If OS is in light mode → App loads in light mode

### Manual Override
Once you toggle the theme manually, your choice is saved and persists across sessions, overriding system preference.

## Technical Details

### localStorage Key
```javascript
localStorage.getItem("theme") // Returns: "light" | "dark"
```

### HTML Class Toggle
```html
<!-- Light mode -->
<html lang="en" class="">

<!-- Dark mode -->
<html lang="en" class="dark">
```

### CSS Variables
```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

## File Structure

```
frontend/src/
├── contexts/
│   └── ThemeContext.tsx          # Theme state management
├── components/
│   └── theme/
│       ├── ThemeToggle.tsx       # Toggle button component
│       └── index.ts              # Barrel export
├── types/
│   └── theme.ts                  # Theme types
└── app/
    ├── layout.tsx                # ThemeProvider integration
    └── globals.css               # Dark mode CSS variables
```

## Best Practices

### 1. Always Use Dark Variants
```tsx
// ❌ Bad
<div className="bg-white text-gray-900">

// ✅ Good
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
```

### 2. Consistent Color Mapping
- `gray-50` → `gray-900`
- `gray-100` → `gray-800`
- `gray-300` → `gray-700`
- `gray-600` → `gray-400`
- `gray-900` → `gray-100`

### 3. Test Both Modes
Always verify your UI works in both light and dark modes.

### 4. Border Visibility
Ensure borders are visible in dark mode:
```tsx
className="border border-gray-300 dark:border-gray-700"
```

## Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Performance

- **Zero Flash**: No theme flash on page load
- **Instant Toggle**: Immediate visual feedback
- **Optimized**: Only re-renders affected components
- **Lightweight**: Minimal bundle impact (~2KB)

## Future Enhancements

- [ ] Multiple theme variants (blue, purple, green)
- [ ] Custom accent colors
- [ ] High contrast mode
- [ ] Color blindness support
- [ ] Theme scheduler (auto-switch by time)
- [ ] Per-page theme overrides
- [ ] Export/import theme settings

## Troubleshooting

### Theme not persisting
- Check localStorage is enabled
- Verify ThemeProvider wraps your app
- Ensure suppressHydrationWarning is on `<html>`

### Flash of unstyled content
- Add `suppressHydrationWarning` to html tag
- Load theme before React hydration

### Dark mode not applying
- Check for missing `dark:` prefixes
- Verify Tailwind config includes dark mode
- Ensure `.dark` class is on `<html>`

## Examples

### Card Component
```tsx
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
    Title
  </h2>
  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
    Description text
  </p>
</div>
```

### Button Component
```tsx
<button className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600">
  Click me
</button>
```

### Input Component
```tsx
<input
  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
  placeholder="Enter text"
/>
```

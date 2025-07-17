# Component Library

Simple reusable components for interactive content.

## Components

### Container
A basic container with header text and optional reset button.

```jsx
import { Container } from './components/ui/Container';

<Container text="Title" showResetButton={true} onReset={handleReset}>
  Your content here
</Container>
```

### FlexiText
A speech bubble with a character image and curved arrow.

```jsx
import { FlexiText } from './components/ui/FlexiText';

<FlexiText>
  Hello! This is a speech bubble.
</FlexiText>
```

### GlowButton
A button with glow animation effects.

```jsx
import { GlowButton } from './components/ui/GlowButton';

<GlowButton onClick={handleClick}>
  Click me
</GlowButton>
```

## Props to pass down

### Container
- `text` - Header text
- `showResetButton` - Show reset button (boolean)
- `onReset` - Reset function
- `children` - Content

### FlexiText
- `children` - Speech bubble text
- `showBubble` - Show speech bubble (boolean)
- `flexiImage` - Character image

### GlowButton
- `children` - Button text
- `onClick` - Click handler
- `disabled` - Disable button (boolean)

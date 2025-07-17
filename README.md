# Container Component Library

A reusable container component library based on the LCM (Least Common Multiple) component structure, providing consistent styling, animations, and interactive features.

## Components

### LCM_INNER_CONTAINER_STYLES (Constants)
Exported constants that provide the exact styling used in the LCM component's inner interactive container:

```jsx
export const LCM_INNER_CONTAINER_STYLES = {
  outer: "w-full max-w-[430px] mx-auto bg-white border border-[#5750E3]/30 rounded-md relative overflow-hidden",
  inner: "relative w-full max-w-[400px] mx-auto",
  outerStyle: { minHeight: '370px', height: 'auto' },
  innerStyle: { minHeight: '420px', height: 'auto' }
};
```

**Usage:**
```jsx
import { LCM_INNER_CONTAINER_STYLES } from './components/ui/Container';

function MyComponent() {
  return (
    <div className={LCM_INNER_CONTAINER_STYLES.outer} style={LCM_INNER_CONTAINER_STYLES.outerStyle}>
      <div className={LCM_INNER_CONTAINER_STYLES.inner} style={LCM_INNER_CONTAINER_STYLES.innerStyle}>
        {/* Your content */}
      </div>
    </div>
  );
}
```

### LCMInnerContainer
A simple component that uses the LCM inner container constants for easy implementation:

```jsx
import { LCMInnerContainer } from './components/ui/Container';

function MyComponent() {
  return (
    <LCMInnerContainer>
      {/* Your content */}
    </LCMInnerContainer>
  );
}
```

### Container
A flexible container component with customizable styling and optional reset button functionality.

### LCMTemplate
A specialized template that matches the exact LCM component structure, including all animations and styling.

### InnerInteractiveContainer
A container component that matches the LCM structure with additional features like text and reset button.

### SimpleContainer
A basic wrapper component for backward compatibility.

## Props

### Container & LCMTemplate Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to render inside the container |
| `className` | string | "" | Additional CSS classes |
| `maxWidth` | string | "max-w-[464px]" | Maximum width constraint |
| `showShadow` | boolean | true | Whether to show the shadow effect |
| `showBorder` | boolean | true | Whether to show the border |
| `selectNone` | boolean | true | Whether to disable text selection |
| `text` | string | "Default Text" | Header text displayed in the top-left |
| `showResetButton` | boolean | false | Whether to show the reset button |
| `onReset` | function | - | Callback function when reset button is clicked |
| `showStyles` | boolean | true | Whether to include the style block (LCMTemplate only) |

## Usage Examples

### Basic Container
```jsx
import { Container } from './components/ui/Container';

function MyComponent() {
  return (
    <Container text="My Custom Title">
      <p>Your content here</p>
    </Container>
  );
}
```

### Container with Reset Button
```jsx
import { Container } from './components/ui/Container';

function InteractiveComponent() {
  const [state, setState] = useState(initialState);

  const handleReset = () => {
    setState(initialState);
  };

  return (
    <Container 
      text="Interactive Component" 
      showResetButton={true}
      onReset={handleReset}
    >
      <p>Interactive content that can be reset</p>
    </Container>
  );
}
```

### LCM Template with Full Styling
```jsx
import { LCMTemplate } from './components/ui/Container';

function AnimatedComponent() {
  const handleReset = () => {
    // Reset your component state
  };

  return (
    <LCMTemplate 
      text="Animated Component"
      showResetButton={true}
      onReset={handleReset}
    >
      <div className="text-center">
        <h3>Your animated content</h3>
        <p>This includes all LCM animations and effects</p>
      </div>
    </LCMTemplate>
  );
}
```

### Custom Styling
```jsx
import { Container } from './components/ui/Container';

function CustomComponent() {
  return (
    <Container 
      text="Custom Styled"
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
      maxWidth="max-w-2xl"
      showShadow={false}
      showBorder={false}
    >
      <p>Custom styled content</p>
    </Container>
  );
}
```

## Styling

### Default Styles
- **Container**: White background, rounded corners, subtle shadow
- **Header**: Blue text (`#5750E3`), small font size, medium weight
- **Reset Button**: Gray styling with hover effects, positioned in top-right
- **Minimum Dimensions**: 300px width, 500px height

### Responsive Behavior
- Adapts to screen size with responsive padding
- Maintains readability on mobile devices
- Flexible width with maximum constraints

## Animations

### Available Animation Classes
- `fade-in` / `fade-out`: Opacity transitions
- `shrink-animation` / `grow-animation`: Scale animations for buttons
- `text-animation`: Fade-in with slight upward movement
- `glow-button`: Animated glow effect for interactive buttons

### Button Animations
- Smooth hover transitions
- Disabled state styling
- Loading state animations

### Speech Bubble Styles
- Positioned speech bubbles with arrows
- Fade-in animations with delays
- Responsive positioning

## Reset Button Features

### Styling
The reset button matches the LCM component's styling:
- Small text size (`text-sm`)
- Gray color scheme with hover effects
- Rounded borders with transitions
- Positioned in the top-right corner of the header

### Functionality
- Optional display via `showResetButton` prop
- Customizable callback via `onReset` prop
- Disabled state support for animation periods
- Tooltip with "Reset interactive" text

### Usage Pattern
```jsx
const handleReset = () => {
  // Reset all component state
  setCurrentStep(1);
  setIsAnimating(false);
  // ... other state resets
};

<Container 
  showResetButton={true}
  onReset={handleReset}
>
  {/* Your content */}
</Container>
```

## Best Practices

### State Management
- Use the reset button to restore initial component state
- Implement proper loading states during reset operations
- Consider animation timing when resetting

### Accessibility
- Always provide meaningful text for the reset button
- Use proper ARIA labels for interactive elements
- Ensure keyboard navigation works correctly

### Performance
- Avoid unnecessary re-renders during reset operations
- Use proper cleanup in useEffect hooks
- Optimize animation performance with CSS transforms

### Customization
- Extend the base components rather than modifying them directly
- Use className prop for additional styling
- Override default props when needed

## Example Implementation

See `ExampleTemplate.jsx` for a complete implementation demonstrating:
- Step-based navigation
- Reset button functionality
- Animation states
- Multiple container variations

## Dependencies

- React 16.8+ (for hooks)
- Tailwind CSS (for styling classes)
- No additional external dependencies required

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS custom properties (for animations)
- ES6+ JavaScript features

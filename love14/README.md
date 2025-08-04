# Glowing Heart Animation

A beautiful, interactive heart animation created with HTML, CSS, and JavaScript. This project features a multi-layered glowing blue heart with dynamic effects and interactive elements.

## Features

- **Multi-layered Heart Design**: 5 concentric heart layers with different sizes and opacity levels
- **Glowing Effects**: CSS box-shadow and border effects create a beautiful blue glow
- **Pulsing Animation**: Smooth scale and opacity animations with staggered timing
- **Interactive Elements**: 
  - Click hearts to create burst particle effects
  - Play/pause button to control animation
  - Mouse movement creates subtle parallax effects
  - Touch support for mobile devices
- **Responsive Design**: Adapts to different screen sizes
- **Keyboard Controls**: Spacebar to pause/resume, R to reset

## File Structure

```
love14/
├── index.html      # Main HTML structure
├── style.css       # CSS styles and animations
├── script.js       # JavaScript interactivity
└── README.md       # This file
```

## How to Run

1. **Simple Method**: Open `index.html` directly in a web browser
2. **Local Server** (Recommended): 
   - Use a local server like Live Server in VS Code
   - Or run: `python -m http.server 3000` in the project directory
   - Then visit: `http://localhost:3000/love14/index.html`

## Code Analysis

### HTML Structure (`index.html`)
- Clean, semantic HTML5 structure
- Container div for centering and positioning
- Multiple heart divs with different classes for layering
- Play button with icon for user interaction

### CSS Styling (`style.css`)
- **Heart Creation**: Uses CSS pseudo-elements (`::before`, `::after`) to create heart shapes from squares
- **Layering System**: 5 heart layers with decreasing sizes and increasing opacity
- **Animation**: CSS `@keyframes` for smooth pulsing effect with staggered delays
- **Glow Effects**: Multiple `box-shadow` properties create the glowing appearance
- **Responsive Design**: Media queries for mobile optimization

### JavaScript Functionality (`script.js`)
- **Event Listeners**: Handles clicks, mouse movement, keyboard input, and touch events
- **Particle System**: Creates burst effects when hearts are clicked
- **Animation Control**: Play/pause functionality with visual feedback
- **Parallax Effect**: Subtle movement based on mouse position
- **Touch Support**: Different behaviors for short taps vs long presses
- **Random Effects**: Periodic sparkle animations for added visual interest

## Technical Details

### Heart Shape Creation
The heart shape is created using CSS by:
1. Starting with a square element rotated 45 degrees
2. Adding two circular pseudo-elements positioned to form the heart curves
3. Using `border-radius: 50%` to create the circular parts

### Animation System
- Uses CSS `animation` property with `ease-in-out` timing
- Staggered delays create a wave-like pulsing effect
- JavaScript controls animation state (play/pause)

### Performance Optimizations
- Uses CSS transforms for smooth animations
- Efficient event handling with proper cleanup
- Minimal DOM manipulation for particle effects

## Browser Compatibility

- Modern browsers with CSS3 and ES6 support
- Mobile browsers with touch event support
- Tested on Chrome, Firefox, Safari, and Edge

## Customization

You can easily customize the animation by modifying:
- Colors in the CSS (change `rgba(0, 150, 255, ...)` values)
- Animation timing in the CSS `@keyframes`
- Number of heart layers by adding/removing HTML elements
- Particle effects in the JavaScript

## License

This project is open source and available under the MIT License.
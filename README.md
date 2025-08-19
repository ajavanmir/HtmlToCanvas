Here's a professional README.md file for your HTML to Canvas project:

```markdown
# HTML to Canvas Screenshot Tool

A powerful JavaScript tool that captures HTML forms (including RTL layouts) and converts them to high-quality PNG images with all form data preserved.

## Features

- ✅ Converts HTML forms to canvas images with perfect fidelity
- ✅ Supports Right-to-Left (RTL) layouts and Persian/Arabic text
- ✅ Preserves all form values (inputs, textareas, selects) in the screenshot
- ✅ Adds dynamic content sections (like "About Me" text) to the output
- ✅ High-resolution output with configurable scaling (2x by default)
- ✅ Clean, responsive UI with Bootstrap RTL
- ✅ Simple one-click export functionality

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ajavanmir/HtmlToCanvas.git
   ```

2. Include the required files in your HTML:
   ```html
   <link rel="stylesheet" href="css/bootstrap.rtl.min.css">
   <link rel="stylesheet" href="css/style.css">
   <script src="js/html2canvas.min.js"></script>
   <script src="js/app.js"></script>
   ```

## Usage

1. Create your form within the `#formToCapture` container
2. Add any additional content sections (like the "About Me" textarea)
3. Click the "Submit Form" button to generate and download the screenshot

### Advanced Configuration

Customize the capture behavior by modifying the `captureSiteToBase64` options:
```javascript
const options = {
  scale: 2,           // Output quality multiplier
  background: '#fff',  // Background color
  width: 800,         // Fixed width (optional)
  useCORS: true       // Enable cross-origin image capture
};
```

## Technical Details

- Uses `HtmlToCanvas` library for DOM to canvas conversion
- Implements custom form value preservation across clones
- Handles RTL text rendering properly
- Includes proper error handling and UI feedback
- Optimized for both desktop and mobile use

## Browser Support

Tested and works on:
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## License

Copyright © 2025 Amir Javanmir. Released under the MIT License.

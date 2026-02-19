# UI Styles Project

This project is designed to provide a set of global CSS styles, button designs, and card designs for web applications. It includes reusable components that can be easily integrated into any project.

## Project Structure

```
ui-styles-project
├── src
│   ├── index.html          # Main HTML file linking styles and components
│   ├── styles              # Directory containing CSS files
│   │   ├── global.css      # Global styles for typography, colors, and layout
│   │   ├── buttons.css     # Styles for button components
│   │   └── cards.css       # Styles for card components
│   └── components          # Directory containing HTML components
│       ├── button.html     # HTML structure for button component
│       └── card.html       # HTML structure for card component
├── package.json            # npm configuration file
├── .gitignore              # Files and directories to ignore in version control
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd ui-styles-project
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Open `src/index.html` in your browser to view the application.

## Usage Guidelines

- The global styles defined in `global.css` will apply to all components.
- Use the button component defined in `button.html` for consistent button styling throughout your application.
- The card component in `card.html` can be used to display content in a visually appealing way.

Feel free to customize the styles in the CSS files to match your project's design requirements.
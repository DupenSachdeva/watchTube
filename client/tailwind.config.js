/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    theme: {
      extend: {
        colors: {
          'background-start': 'hsl(238, 55%, 30%)',  // Dark blue
          'background-middle': ' hsl(270, 61%, 34%)', // Medium blue
          'background-end': 'hsl(326, 74%, 45%)z',   // Lighter blue
          'text-primary': 'hsl(210, 100%, 100%)',    // White
          'text-secondary': 'hsl(210, 100%, 90%)',    // Very light blue
          'text-tertiary': 'hsl(210, 100%, 80%)',     // Light blue
          'sidebar-bg': 'hsla(210, 100%, 5%, 0.8)',   // Very dark blue
          'accent-primary': 'hsl(210, 100%, 60%)',    // Bright blue
          'button-hover': 'hsla(210, 100%, 100%, 0.1)', // Light blue with transparency
          'input-bg': 'hsla(210, 100%, 100%, 0.1)',    // Light blue with transparency
          'input-placeholder': 'hsl(210, 100%, 75%)',   // Light blue
          'tab-active': 'hsl(210, 100%, 60%)',          // Bright blue
          'border-subtle': 'hsla(210, 100%, 100%, 0.2)', // Light blue with transparency
          'card-bg': 'hsla(210, 100%, 50%, 0.1)',       // Light blue background
          'overlay-bg': 'hsla(210, 100%, 5%, 0.7)',     // Dark blue overlay
        },
      },
    },
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
  
    plugins: [require("tailwindcss-animate")],
}

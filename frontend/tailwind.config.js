/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust this based on your file structure
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        // Add any other custom properties as needed
        metal: '#b0b0b0',   // Light metallic gray
        darkMetal: '#4b4b4b',  // Darker metallic gray
        rust: '#b7410e',  // Rusty color
        industrialBlue: '#2c3e50',  // Industrial blue color
        gearGold: '#d4af37',  // Gold for special accents (e.g., interactive elements)
      },
    },
  },
  plugins: [],
};

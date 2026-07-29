/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offwhite: {
          DEFAULT: '#FDFBF7',  // Off-white canvas
          card: '#FFFFFF',     // Pure white surface card
          subtle: '#F4F1EA'    // Light warm gray container
        },
        burgundy: {
          DEFAULT: '#800020',  // Deep Burgundy
          hover: '#660019',
          light: 'rgba(128, 0, 32, 0.08)'
        },
        gold: {
          DEFAULT: '#FFCE1B',  // Warm Yellow / Gold
          hover: '#E5B700',
          light: 'rgba(255, 206, 27, 0.15)'
        },
        terracotta: {
          DEFAULT: '#A52A2A',  // Deep Crimson / Terracotta
          hover: '#872222',
          light: 'rgba(165, 42, 42, 0.10)'
        },
        rust: {
          DEFAULT: '#BE5103',  // Burnt Amber / Rust
          hover: '#9E4202',
          light: 'rgba(190, 81, 3, 0.10)'
        },
        charcoal: {
          DEFAULT: '#1A1A1A',  // High contrast text
          muted: '#5A5A5A',    // Muted text
          subtle: '#8C8C8C'    // Light caption text
        },
        cardborder: '#E8E5DF'  // Clean subtle 1px border
      },
      borderRadius: {
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      fontFamily: {
        sans: ['Lora', 'Georgia', 'serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        cursive: ['Dancing Script', 'cursive'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [],
}

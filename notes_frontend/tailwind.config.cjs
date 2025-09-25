/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#F59E0B',
        success: '#10B981',
        error: '#EF4444',
        background: '#f9fafb',
        surface: '#ffffff',
        'text-primary': '#111827',
        'text-secondary': '#6B7280',
      },
      gradientColorStops: {
        'gradient-start': 'from-blue-500/10',
        'gradient-end': 'to-gray-50',
      }
    },
  },
  plugins: [],
}

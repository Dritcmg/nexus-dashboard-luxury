/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: '#020617', // Deep Dark Mode Deep Dark
                    card: 'rgba(15, 23, 42, 0.5)', // bg-slate-900/50 transparent
                    border: '#1e293b' // slate-800
                },
                brand: {
                    blue: '#3B82F6',
                    electric: '#2563EB',
                    glow: 'rgba(59, 130, 246, 0.4)'
                }
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'border-flow': 'border-flow 3s linear infinite',
            },
            keyframes: {
                'border-flow': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                }
            }
        },
    },
    plugins: [],
}

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                primary: ['Cairo'],
            },
            colors: {
                orange: '#F8481E',
                ored: '#F12F40',
                pinred: '#DE1A5E',
                success: '#097969',
                dark: '#121212',
                darkForeground: '#242424',
                light: '#FFFFFF',
                lightForeground: '#e6e6e6',
            },
        },
    },
    plugins: [],
}

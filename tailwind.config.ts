import type { Config } from 'tailwindcss';

const config = {
    darkMode: ['class'],
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        screens: {
            mobile: '375px',
            lobile: '425px',
            mablet: '530px',
            tablet: '650px',
            taptop: '820px',
            laptop: '960px',
            lesktop: '1080px',
            desktop: '1280px',
        },
        extend: {
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            colors: {
                primary: '#de9292',
                'primary-dark': '#da8484',

                background: '#F4E4E4',
                'background-darkish': '#edd3d3',
                'background-dark': '#edd3d3',

                success: '#bceabc',
                warning: '#eaeabc',
                error: '#eabcbc',
            },
        },
    },
    // plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;

// import type { Config } from 'tailwindcss';

// const config: Config = {
//     content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
//     theme: {
//         screens: {
//             mobile: '375px',
//             lobile: '425px',
//             mablet: '530px',
//             tablet: '650px',
//             taptop: '820px',
//             laptop: '960px',
//             desktop: '1280px',
//         },
//         extend: {
//             backgroundImage: {
//                 'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
//                 'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
//             },
//             colors: {
//                 primary: '#de9292',
//                 'primary-dark': '#da8484',

//                 background: '#F4E4E4',
//                 'background-dark': '#edd3d3',
//             },
//         },
//     },
//     plugins: [],
// };
// export default config;

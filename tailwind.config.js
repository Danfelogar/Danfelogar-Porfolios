import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				atomic: ["Poppins"],
			},
			colors: {
        ...defaultTheme.colors,
				primary: "var(--primary)",
				"alternative-primary": "var(--alternative-primary)",
				"primary-2": "var(--primary-2)",
				secondary: "var(--secondary)",
				tertiary: "var(--tertiary)",
				"black-100": "var(--black-100)",
				"black-200": "var(--black-200)",
				"white-100": "var(--white-100)",
			},
			screens: {
				xs: "360px",
				sm: '480px',
				md: '768px',
				lg: '976px',
				xl: '1440px',
				"3xl": "1650px",
			},
			boxShadow: {
				card: "0px 35px 120px -15px #211e35",
			},
			backgroundImage: {
				"personal-bg": "url('/public/imgs/header_bg_op_4.png')",
			}
		},
	},
  plugins: [require("@tailwindcss/typography")],
}
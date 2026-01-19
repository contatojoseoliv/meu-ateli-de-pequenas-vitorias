import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Paleta Meu Ateliê de Pequenas Vitórias
        "verde-eucalipto": {
          DEFAULT: "hsl(var(--verde-eucalipto))",
          10: "hsl(var(--verde-eucalipto-10))",
          30: "hsl(var(--verde-eucalipto-30))",
          60: "hsl(var(--verde-eucalipto-60))",
          120: "hsl(var(--verde-eucalipto-120))",
        },
        "rosa-argila": {
          DEFAULT: "hsl(var(--rosa-argila))",
          10: "hsl(var(--rosa-argila-10))",
          30: "hsl(var(--rosa-argila-30))",
          60: "hsl(var(--rosa-argila-60))",
          120: "hsl(var(--rosa-argila-120))",
        },
        "ocre-dourado": "hsl(var(--ocre-dourado))",
        "cinza-nuvem": "hsl(var(--cinza-nuvem))",
        "grafite-suave": "hsl(var(--grafite-suave))",
        "terra-cota": "hsl(var(--terra-cota))",
        
        // Semantic tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        handwritten: ['Dancing Script', 'cursive'],
      },
      fontSize: {
        // Hierarquia tipográfica conforme Manual
        'h1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '1.3', fontWeight: '700' }],
        'h3': ['28px', { lineHeight: '1.4', fontWeight: '700' }],
        'h4': ['22px', { lineHeight: '1.4', fontWeight: '700' }],
        'lead': ['18px', { lineHeight: '1.8', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        DEFAULT: "8px",
        full: "50px",
      },
      boxShadow: {
        'suave': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'elevada': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'cta': '0 8px 24px hsl(35 52% 50% / 0.3)',
        'cta-hover': '0 12px 32px hsl(35 52% 50% / 0.4)',
        'header': '0 2px 4px rgba(0, 0, 0, 0.05)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

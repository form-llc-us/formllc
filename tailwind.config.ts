import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./data/**/*.{ts,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        md: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },

    extend: {
      colors: {
        /**
         * Text scale — neutral warm ink.
         */
        ink: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },

        /**
         * Primary brand crimson — use 600/700 for buttons and accents.
         */
        brand: {
          50:  "#fff5f6",
          100: "#ffe8ec",
          200: "#ffd1da",
          300: "#ffb3b8",
          400: "#ff7b88",
          500: "#ff4d5a",
          600: "#d93a47",
          700: "#be123c",
          800: "#9e1439",
          900: "#7c1130",
          950: "#4c0a1f",
        },

        crimson: {
          50:  "#fff5f6",
          100: "#ffe8ec",
          200: "#ffd1da",
          300: "#ffb3b8",
          400: "#ff7b88",
          500: "#ff4d5a",
          600: "#d93a47",
          700: "#be123c",
          800: "#9e1439",
          900: "#7c1130",
          950: "#4c0a1f",
        },

        /**
         * Deep navy — primary brand gradient start.
         */
        navy: {
          50:  "#eef1f8",
          100: "#d6dcee",
          200: "#adb8dc",
          300: "#8494ca",
          400: "#6070b8",
          500: "#3c4d9e",
          600: "#2d3b86",
          700: "#1e2a6e",
          800: "#141e55",
          900: "#0f2864",
          950: "#0c1937",
        },

        /**
         * Premium plum — brand gradient middle.
         */
        plum: {
          50:  "#f9f0f5",
          100: "#f3dce8",
          200: "#e7b9d0",
          300: "#d88fb5",
          400: "#c86699",
          500: "#b64080",
          600: "#9d2769",
          700: "#8a1b5a",
          800: "#731e45",
          900: "#931b63",
          950: "#4B1B38",
        },

        /**
         * Rose — subtle accent only.
         */
        rose: {
          50:  "#fffafa",
          100: "#fff4f5",
          200: "#fde8ec",
          300: "#f9d2da",
          400: "#efacbb",
          500: "#df8298",
        },

        /**
         * Cream — light text for dark gradient sections.
         * Also used for decorative warm surfaces.
         */
        cream: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
        },

        /**
         * Gold — ONLY for star ratings. Do not use as section color.
         */
        gold: {
          50:  "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },

        /**
         * Surface — light section backgrounds.
         */
        surface: {
          DEFAULT: "hsl(220 30% 97%)",
          paper:   "#ffffff",
          canvas:  "hsl(220 22% 96%)",
          muted:   "hsl(220 18% 95%)",
          warm:    "hsl(220 25% 96%)",
          blush:   "hsl(350 60% 97%)",
          rose:    "#fffafa",
          dark:    "#0c1937",
          wine:    "#4b1b38",
        },

        wine: {
          700: "#731e45",
          800: "#4b1b38",
          900: "#2d0e22",
        },
      },

      fontFamily: {
        sans: [
          "var(--font-dm-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "var(--font-dm-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: [
          "var(--font-playfair)",
          "Georgia",
          "serif",
        ],
      },

      backgroundImage: {
        /**
         * Primary brand gradient — header, footer, CTA, PageHero, dark cards.
         */
        "brand-gradient":
          "radial-gradient(920px 620px at 8% 12%, rgba(15,40,100,0.42) 0%, rgba(15,40,100,0.26) 28%, transparent 66%), radial-gradient(980px 700px at 52% 34%, rgba(147,27,99,0.50) 0%, rgba(147,27,99,0.32) 36%, transparent 74%), radial-gradient(840px 600px at 98% 24%, rgba(158,20,57,0.34) 0%, rgba(158,20,57,0.18) 34%, transparent 78%), linear-gradient(115deg, #0f2864 0%, #213071 22%, #931b63 48%, #9a1b52 74%, #9e1439 100%)",

        /**
         * Light hero mesh — home hero section.
         */
        "premium-mesh":
          "radial-gradient(720px 360px at 10% 0%, rgba(15,40,100,0.06), transparent 62%), radial-gradient(680px 340px at 90% 8%, rgba(147,27,99,0.05), transparent 64%), hsl(220, 30%, 97%)",

        /**
         * Subtle off-white for standard sections/hero.
         */
        "soft-premium":
          "radial-gradient(720px 360px at 10% 0%, rgba(15,40,100,0.05), transparent 62%), radial-gradient(680px 340px at 90% 8%, rgba(147,27,99,0.04), transparent 64%), hsl(220, 30%, 97%)",

        /**
         * Dark CTA gradient (alias of brand-gradient for legacy compat).
         */
        "soft-crimson":
          "radial-gradient(920px 620px at 8% 12%, rgba(15,40,100,0.42) 0%, transparent 66%), radial-gradient(980px 700px at 52% 34%, rgba(147,27,99,0.50) 0%, transparent 74%), linear-gradient(115deg, #0f2864 0%, #213071 28%, #931b63 56%, #9e1439 100%)",

        /**
         * Accent panel — trust/brand highlight.
         */
        "soft-gold":
          "radial-gradient(620px 280px at 85% 8%, rgba(147,27,99,0.07), transparent 64%), hsl(220, 30%, 97%)",

        /**
         * Clean white card surface.
         */
        "luxury-card":
          "linear-gradient(180deg, rgba(255,255,255,1), rgba(248,250,252,0.98))",

        "glass-card":
          "linear-gradient(180deg, rgba(255,255,255,0.82), rgba(248,250,252,0.72))",

        /**
         * Dark navy section background.
         */
        "dark-mesh":
          "radial-gradient(circle at 18% 0%, rgba(15,40,100,0.32), transparent 38%), radial-gradient(circle at 82% 8%, rgba(147,27,99,0.24), transparent 44%), linear-gradient(180deg, #0d1a3a 0%, #0c1530 100%)",

        "brand-radial":
          "radial-gradient(720px 320px at 16% 0%, rgba(15,40,100,0.08), transparent 64%), radial-gradient(680px 320px at 90% 8%, rgba(147,27,99,0.06), transparent 64%)",
      },

      boxShadow: {
        soft:
          "0 1px 2px rgba(15,23,42,0.04), 0 8px 22px rgba(15,23,42,0.06)",

        card:
          "0 1px 3px rgba(15,23,42,0.06), 0 16px 36px rgba(15,23,42,0.06)",

        "card-hover":
          "0 2px 6px rgba(15,23,42,0.08), 0 24px 48px rgba(15,23,42,0.09)",

        premium:
          "0 1px 3px rgba(15,23,42,0.06), 0 18px 46px rgba(15,23,42,0.07)",

        "premium-hover":
          "0 2px 8px rgba(15,23,42,0.09), 0 26px 64px rgba(15,23,42,0.10)",

        button:
          "0 6px 16px rgba(217,58,71,0.32), 0 2px 4px rgba(217,58,71,0.18)",

        "button-hover":
          "0 10px 24px rgba(255,77,90,0.38), 0 4px 8px rgba(255,77,90,0.20)",

        glow:
          "0 0 0 1px rgba(217,58,71,0.16), 0 18px 46px rgba(217,58,71,0.14)",

        inset:
          "inset 0 1px 0 rgba(255,255,255,0.88)",
      },

      borderRadius: {
        xl2:    "1.25rem",
        "2.5xl": "1.5rem",
        "3xl":  "1.75rem",
        "4xl":  "2rem",
        "5xl":  "2.5rem",
      },

      maxWidth: {
        prose:   "70ch",
        content: "760px",
        section: "1120px",
        wide:    "1200px",
      },

      spacing: {
        section:    "5.5rem",
        "section-sm": "3.75rem",
        "section-lg": "7rem",
      },

      letterSpacing: {
        tighterPremium: "-0.04em",
        tightPremium:   "-0.028em",
        normalPremium:  "-0.012em",
      },

      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body":         "#475569",
            "--tw-prose-headings":     "#0f172a",
            "--tw-prose-links":        "#d93a47",
            "--tw-prose-bold":         "#0f172a",
            "--tw-prose-counters":     "#64748b",
            "--tw-prose-bullets":      "#d93a47",
            "--tw-prose-hr":           "#e2e8f0",
            "--tw-prose-quotes":       "#1e293b",
            "--tw-prose-quote-borders": "#d93a47",
            "--tw-prose-captions":     "#64748b",
            "--tw-prose-code":         "#9e1439",
            "--tw-prose-pre-code":     "#f8fafc",
            "--tw-prose-pre-bg":       "#0f172a",
            "--tw-prose-th-borders":   "#e2e8f0",
            "--tw-prose-td-borders":   "#f1f5f9",

            color: "#475569",
            lineHeight: "1.78",

            h1: { color: "#0f172a", letterSpacing: "-0.045em", fontWeight: "800" },
            h2: { color: "#0f172a", letterSpacing: "-0.04em",  fontWeight: "800" },
            h3: { color: "#0f172a", letterSpacing: "-0.025em", fontWeight: "750" },

            a: {
              color: "#d93a47",
              fontWeight: "650",
              textDecorationColor: "rgba(217,58,71,0.24)",
              textUnderlineOffset: "4px",
            },

            strong: { color: "#0f172a", fontWeight: "750" },

            blockquote: {
              color: "#1e293b",
              borderLeftColor: "#d93a47",
              backgroundColor: "rgba(217,58,71,0.045)",
              borderRadius: "0 1rem 1rem 0",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              paddingRight: "1.5rem",
            },

            table: {
              borderColor: "rgba(100,116,139,0.16)",
              borderRadius: "1rem",
              overflow: "hidden",
            },

            thead: { borderBottomColor: "rgba(100,116,139,0.18)" },

            th: {
              color: "#0f172a",
              backgroundColor: "rgba(15,40,100,0.05)",
              fontWeight: "750",
            },

            td: { borderBottomColor: "rgba(100,116,139,0.10)" },

            code: {
              color: "#9e1439",
              backgroundColor: "rgba(217,58,71,0.06)",
              borderRadius: "0.5rem",
              padding: "0.15rem 0.35rem",
              fontWeight: "650",
            },
          },
        },
      }),
    },
  },

  plugins: [],
};

export default config;

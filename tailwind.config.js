const { colors, fontFamily, typeScale } = require("./src/constants/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: colors.primary.purple,
          "deep-purple": colors.primary.deepPurple,
          blue: colors.primary.blue,
          green: colors.primary.green,
        },
        success: colors.semantic.success,
        warning: colors.semantic.warning,
        streak: colors.semantic.streak,
        error: colors.semantic.error,
        info: colors.semantic.info,
        text: {
          primary: colors.neutral.textPrimary,
          secondary: colors.neutral.textSecondary,
        },
        border: colors.neutral.border,
        surface: colors.neutral.surface,
        background: colors.neutral.background,
      },
      fontFamily: {
        regular: [fontFamily.regular],
        medium: [fontFamily.medium],
        semibold: [fontFamily.semibold],
        bold: [fontFamily.bold],
      },
      fontSize: {
        h1: [`${typeScale.h1.fontSize}px`, { lineHeight: `${typeScale.h1.lineHeight}` }],
        h2: [`${typeScale.h2.fontSize}px`, { lineHeight: `${typeScale.h2.lineHeight}` }],
        h3: [`${typeScale.h3.fontSize}px`, { lineHeight: `${typeScale.h3.lineHeight}` }],
        h4: [`${typeScale.h4.fontSize}px`, { lineHeight: `${typeScale.h4.lineHeight}` }],
        "body-lg": [`${typeScale.bodyLarge.fontSize}px`, { lineHeight: `${typeScale.bodyLarge.lineHeight}` }],
        "body-md": [`${typeScale.bodyMedium.fontSize}px`, { lineHeight: `${typeScale.bodyMedium.lineHeight}` }],
        "body-sm": [`${typeScale.bodySmall.fontSize}px`, { lineHeight: `${typeScale.bodySmall.lineHeight}` }],
        caption: [`${typeScale.caption.fontSize}px`, { lineHeight: `${typeScale.caption.lineHeight}` }],
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

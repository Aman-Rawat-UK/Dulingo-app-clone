// Design tokens sourced from prompt_material/01-design-system.png

export const fontFamily = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semibold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

// size (px), lineHeight (multiplier), fontFamily
export const typeScale = {
  h1: { fontSize: 32, lineHeight: 1.2, fontFamily: fontFamily.bold },
  h2: { fontSize: 24, lineHeight: 1.3, fontFamily: fontFamily.semibold },
  h3: { fontSize: 20, lineHeight: 1.3, fontFamily: fontFamily.semibold },
  h4: { fontSize: 16, lineHeight: 1.4, fontFamily: fontFamily.medium },
  bodyLarge: { fontSize: 16, lineHeight: 1.6, fontFamily: fontFamily.regular },
  bodyMedium: { fontSize: 14, lineHeight: 1.6, fontFamily: fontFamily.regular },
  bodySmall: { fontSize: 13, lineHeight: 1.6, fontFamily: fontFamily.regular },
  caption: { fontSize: 11, lineHeight: 1.4, fontFamily: fontFamily.regular },
} as const;

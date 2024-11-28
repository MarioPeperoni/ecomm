export const FontName = {
  ARIAL: "ARIAL",
  TIMES_NEW_ROMAN: "TIMES_NEW_ROMAN",
  COMIC_SANS: "COMIC_SANS",
} as const;

export type FontName = keyof typeof FontName;

export const fontNameLabels: Record<FontName, string> = {
  ARIAL: "Arial",
  TIMES_NEW_ROMAN: "Times New Roman",
  COMIC_SANS: "Comic Sans",
};

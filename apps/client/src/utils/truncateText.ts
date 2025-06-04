export const truncate = (
  text: string | undefined,
  maxCharacters: number = 35,
): string => {
  if (!text) return "";

  return text.length > maxCharacters
    ? text.slice(0, maxCharacters - 3) + "..."
    : text;
};

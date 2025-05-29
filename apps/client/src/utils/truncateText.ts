export const truncate = (text: string, maxCharacters: number = 35): string => {
  return text.length > maxCharacters
    ? text.slice(0, maxCharacters + 1) + "..."
    : text;
};

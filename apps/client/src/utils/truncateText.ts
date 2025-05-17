export const truncate = (text: string, maxCharacters: number = 35): string => {
  return text.slice(0, maxCharacters + 1) + "...";
};

export const formatCapitalLetters = (value: string) => {
  const nameFolderFormatted = value.replaceAll('-', ' ');
  return nameFolderFormatted.toLowerCase().charAt(0).toUpperCase() + nameFolderFormatted.slice(1);
};

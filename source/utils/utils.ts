import {
  lowerCase
} from 'lodash';

export const toCapitalLetters = (value: string) => {
  const nameFolderFormatted = lowerCase(value);
  return nameFolderFormatted.charAt(0).toUpperCase() + nameFolderFormatted.slice(1);
};

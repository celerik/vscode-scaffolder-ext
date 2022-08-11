// packages
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import {
  camelCase,
  kebabCase,
  lowerCase,
  snakeCase,
  upperCase,
  startCase
} from 'lodash';

// constants
const CASES = {
  camel: (value: string) => camelCase(value),
  kebab: (value: string) => kebabCase(value),
  lower: (value: string) => value.toLowerCase(),
  lowerWithSpace: (value: string) => lowerCase(value),
  pascal: (value: string) => startCase(camelCase(value)).replace(/ /g, ''),
  snake: (value: string) => snakeCase(value),
  upper: (value: string) => value.toUpperCase(),
  upperKebab: (value: string) => kebabCase(value).toUpperCase(),
  upperSnake: (value: string) => snakeCase(value).toUpperCase(),
  upperWithSpace: (value: string) => upperCase(value)
};

// functions
const ensureDirectoryExistence = (filePath: string) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
  return false;
};

const onRenderContent = (
  data: string,
  values: Record<string, string>,
  expressions: any
) => {
  let stringContent = data;
  Object.keys(values).forEach((key) => {
    stringContent = stringContent.replaceAll(key, values[key]);
  });
  Object.keys(expressions).forEach((expression) => {
    if (Object.keys(CASES).indexOf(expressions[expression].case) > -1
      && expressions[expression].case && expressions[expression].variable) {
      stringContent = stringContent
        .replaceAll(
          expression,
          CASES[
          expressions[expression].case as keyof typeof CASES
          ](values[expressions[expression].variable])
        );
    } else {
      vscode.window.showErrorMessage(`Invalid formatting in the expression: ${expression}`);
    }
  });
  return stringContent;
};

const walk = (dir: string) => {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const newFile = `${dir}\\${file}`;
    const stat = fs.statSync(newFile);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(newFile));
    } else {
      /* Is a file */
      results.push(newFile);
    }
  });
  return results;
};

export {
  ensureDirectoryExistence,
  onRenderContent,
  walk,
  CASES
};

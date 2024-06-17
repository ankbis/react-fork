import { parseValue } from './parser';

export function parseJSON(input: string): any {
  let pos = 0;
  const value = parseValue(input, pos);
  if (pos < input.length) {
    throw new JsonParseError('Unexpected characters after JSON data');
  }
  return value;
}

export { JsonParseError } from './errors';
export {
  JsonValue,
  JsonNull,
  JsonBoolean,
  JsonNumber,
  JsonString,
  JsonArray,
  JsonObject,
} from './types';

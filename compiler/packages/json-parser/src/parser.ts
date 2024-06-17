import { JsonParseError } from './errors';
import {
  JsonValue,
  JsonNull,
  JsonBoolean,
  JsonNumber,
  JsonString,
  JsonArray,
  JsonObject,
} from './types';
import { convert_number, convert_string } from 'compiler/crates/react_hermes_parser/src/generated_extension';

function parseWhitespace(input: string, pos: number): number {
  const whitespace = /\s/;
  while (pos < input.length && whitespace.test(input[pos])) {
    pos++;
  }
  return pos;
}

export function parseValue(input: string, pos: number): JsonValue {
  pos = parseWhitespace(input, pos);
  if (pos >= input.length) {
    throw new JsonParseError('Unexpected end of input');
  }

  const char = input[pos];
  if (char === 'n') {
    return parseNull(input, pos);
  } else if (char === 't' || char === 'f') {
    return parseBoolean(input, pos);
  } else if (char === '-' || char >= '0' && char <= '9') {
    return parseNumber(input, pos);
  } else if (char === '"') {
    return parseString(input, pos);
  } else if (char === '[') {
    return parseArray(input, pos);
  } else if (char === '{') {
    return parseObject(input, pos);
  } else {
    throw new JsonParseError(`Unexpected character: ${char}`);
  }
}

function parseNull(input: string, pos: number): JsonNull {
  if (input.startsWith('null', pos)) {
    return { type: 'null', value: null, pos, end: pos + 4 };
  }
  throw new JsonParseError('Expected "null"');
}

function parseBoolean(input: string, pos: number): JsonBoolean {
  if (input.startsWith('true', pos)) {
    return { type: 'boolean', value: true, pos, end: pos + 4 };
  } else if (input.startsWith('false', pos)) {
    return { type: 'boolean', value: false, pos, end: pos + 5 };
  }
  throw new JsonParseError('Expected "true" or "false"');
}

function parseNumber(input: string, pos: number): JsonNumber {
  const match = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/.exec(input.slice(pos));
  if (match) {
    const value = convert_number(Number(match[0]));
    return { type: 'number', value, pos, end: pos + match[0].length };
  }
  throw new JsonParseError('Expected a number');
}

function parseString(input: string, pos: number): JsonString {
  let value = '';
  pos++;
  while (pos < input.length) {
    if (input[pos] === '"') {
      return { type: 'string', value: convert_string(value), pos: pos - value.length, end: pos + 1 };
    } else if (input[pos] === '\\') {
      pos++;
      // TODO: Handle escape sequences
    } else {
      value += input[pos];
    }
    pos++;
  }
  throw new JsonParseError('Unterminated string');
}

function parseArray(input: string, pos: number): JsonArray {
  pos++;
  const arr: JsonArray = [];
  let start = pos;
  while (pos < input.length) {
    if (input[pos] === ']') {
      pos++;
      return arr;
    } else {
      arr.push(parseValue(input, pos));
      pos = arr[arr.length - 1].end;
      if (input[pos] === ',') {
        pos++;
      } else if (input[pos] !== ']') {
        throw new JsonParseError('Expected "," or "]"');
      }
    }
  }
  throw new JsonParseError('Unterminated array');
}

function parseObject(input: string, pos: number): JsonObject {
  pos++;
  const obj: JsonObject = {};
  let start = pos;
  while (pos < input.length) {
    if (input[pos] === '}') {
      pos++;
      return obj;
    } else {
      const key = parseString(input, pos);
      pos = key.end;
      if (input[pos] !== ':') {
        throw new JsonParseError('Expected ":"');
      }
      pos++;
      obj[key.value] = parseValue(input, pos);
      pos = obj[key.value].end;
      if (input[pos] === ',') {
        pos++;
      } else if (input[pos] !== '}') {
        throw new JsonParseError('Expected "," or "}"');
      }
    }
  }
  throw new JsonParseError('Unterminated object');
}

export type JsonValue =
  | JsonNull
  | JsonBoolean
  | JsonNumber
  | JsonString
  | JsonArray
  | JsonObject;

export interface JsonNull {
  type: 'null';
  value: null;
  pos: number;
  end: number;
}

export interface JsonBoolean {
  type: 'boolean';
  value: boolean;
  pos: number;
  end: number;
}

export interface JsonNumber {
  type: 'number';
  value: number;
  pos: number;
  end: number;
}

export interface JsonString {
  type: 'string';
  value: string;
  pos: number;
  end: number;
}

export interface JsonArray extends Array<JsonValue> {}

export interface JsonObject extends Record<string, JsonValue> {}

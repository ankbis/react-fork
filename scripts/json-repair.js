function repairJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return jsonString; // Valid JSON, no repair needed
  } catch (error) {
    const regex = /("(?:\\"|[^"])*")|(:)|(,)(?=\s*?[\}\]])|(\[|\{)([^\[\]\{\}"]+?)\s*?([^\[\]\{\}"]+?)([^\[\]\{\}"]+?)\s*?([\]\}])/g;
    const fixedString = jsonString.replace(regex, (match, string, colon, comma, openBracket, value1, value2, value3, closeBracket) => {
      if (string) return string;
      if (colon) return ":";
      if (comma) return "";
      if (openBracket && value1 && value2 && value3 && closeBracket) {
        return `${openBracket}"${value1}","${value2}","${value3}"${closeBracket}`;
      }
      return match;
    });
    return fixedString;
  }
}

module.exports = repairJSON;

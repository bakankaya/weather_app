/* This JavaScript function  is designed to convert any given text
by replacing special characters (with accents) into their corresponding ASCII
character encoding, which is commonly used in computer systems and applications. */

export default function convertToASCII(text) {
  const CharMap = new Map([
    ["ç", "c"],["Ç", "C"],
    ["ğ", "g"],["Ğ", "G"],
    ["ş", "s"],["Ş", "S"],
    ["ü", "u"],["Ü", "U"],
    ["ı", "i"],["İ", "I"],
    ["ö", "o"],["Ö", "O"],
  ]);

  for (let [key, value] of CharMap) {
    text = text.replaceAll(`${key}`, `${value}`);
  }

  return text;
}

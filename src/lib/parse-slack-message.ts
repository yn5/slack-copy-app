export function parseSlackMessage(slackMessage: string) {
  const parsedSlackMessage = parseLinks(
    parseStrikethrough(parseBoldText(parseLists(slackMessage))),
  );

  return parsedSlackMessage;
}

function parseLinks(slackMessage: string) {
  const regex = /<([^|]+)\|([^>]+)>/g;

  const parsedLinks = slackMessage.replaceAll(regex, "[$2]($1)");
  return parsedLinks;
}

function parseStrikethrough(slackMessage: string) {
  const parsedBoldText = slackMessage.replaceAll(/\~(.*?)\~/g, "~~$1~~");

  return parsedBoldText;
}

function parseBoldText(slackMessage: string) {
  const parsedBoldText = slackMessage.replaceAll(/\*(.*?)\*/g, "**$1**");

  return parsedBoldText;
}

function parseLists(slackMessage: string) {
  const symbolsToReplace = ["•", "◦", "▪︎"];
  const alphabeticItems = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

  // Replace list symbols
  const replacedSymbols = symbolsToReplace.reduce(
    (message, symbol) => message.replaceAll(symbol, "-"),
    slackMessage,
  );

  // Replace alphabetic items
  const replacedAlphabetic = alphabeticItems.reduce(
    (message, letter, index) => {
      const replacementNumber = (index + 1).toString();
      return message
        .replaceAll(`    ${letter}. `, `    ${replacementNumber}. `)
        .replaceAll(
          `            ${letter}. `,
          `            ${replacementNumber}. `,
        );
    },
    replacedSymbols,
  );

  // Replace roman numerals
  const replacedRomanNumerals = romanNumerals.reduce(
    (message, numeral, index) => {
      const replacementNumber = (index + 1).toString();
      return message.replaceAll(
        `        ${numeral}. `,
        `        ${replacementNumber}. `,
      );
    },
    replacedAlphabetic,
  );

  return replacedRomanNumerals;
}

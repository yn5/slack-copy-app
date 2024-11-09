export function parseSlackMessage(slackMessage: string) {
  const parsedSlackMessage = new SlackMessageParser(slackMessage)
    .parseLists()
    .parseBoldText()
    .parseStrikethrough()
    .parseLinks()
    .getMessage();

  return parsedSlackMessage;
}
class SlackMessageParser {
  private message: string;

  constructor(message: string) {
    this.message = message;
  }

  parseLinks(): SlackMessageParser {
    const regex = /<([^|]+)\|([^>]+)>/g;
    this.message = this.message.replaceAll(regex, "[$2]($1)");
    return this;
  }

  parseStrikethrough(): SlackMessageParser {
    this.message = this.message.replaceAll(/\~(.*?)\~/g, "~~$1~~");
    return this;
  }

  parseBoldText(): SlackMessageParser {
    this.message = this.message.replaceAll(/\*(.*?)\*/g, "**$1**");
    return this;
  }

  parseLists(): SlackMessageParser {
    const symbolsToReplace = ["\u2022", "\u25E6", "\u25AA\uFE0E"];
    const alphabeticItems = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const romanNumerals = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"];

    // Replace list symbols
    this.message = symbolsToReplace.reduce(
      (message, symbol) => message.replaceAll(symbol, "-"),
      this.message,
    );

    // Replace alphabetic items
    this.message = alphabeticItems.reduce((message, letter, index) => {
      const replacementNumber = (index + 1).toString();
      return message
        .replaceAll(`    ${letter}. `, `    ${replacementNumber}. `)
        .replaceAll(
          `            ${letter}. `,
          `            ${replacementNumber}. `,
        );
    }, this.message);

    // Replace roman numerals
    this.message = romanNumerals.reduce((message, numeral, index) => {
      const replacementNumber = (index + 1).toString();
      return message.replaceAll(
        `        ${numeral}. `,
        `        ${replacementNumber}. `,
      );
    }, this.message);

    return this;
  }

  getMessage(): string {
    return this.message;
  }
}

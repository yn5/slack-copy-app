export function parseSlackMessage(slackMessage: string) {
  const parsedSlackMessage = parseStrikeThrough(
    parseBoldText(parseLists(slackMessage)),
  );

  return parsedSlackMessage;
}

function parseStrikeThrough(slackMessage: string) {
  const parsedBoldText = slackMessage.replaceAll(/\~(.*?)\~/g, "~~$1~~");

  return parsedBoldText;
}

function parseBoldText(slackMessage: string) {
  const parsedBoldText = slackMessage.replaceAll(/\*(.*?)\*/g, "**$1**");

  return parsedBoldText;
}

function parseLists(slackMessage: string) {
  const parsedLists = slackMessage
    .replaceAll("•", "-")
    .replaceAll("◦", "-")
    .replaceAll("▪︎", "-")
    .replaceAll("    a. ", "    1. ")
    .replaceAll("    b. ", "    2. ")
    .replaceAll("    c. ", "    3. ")
    .replaceAll("    d. ", "    4. ")
    .replaceAll("    e. ", "    5. ")
    .replaceAll("    f. ", "    6. ")
    .replaceAll("    g. ", "    7. ")
    .replaceAll("    h. ", "    8. ")
    .replaceAll("        i. ", "        1. ")
    .replaceAll("        ii. ", "        2. ")
    .replaceAll("        iii. ", "        3. ")
    .replaceAll("        iv. ", "        4. ")
    .replaceAll("        v. ", "        5. ")
    .replaceAll("        vi. ", "        6. ")
    .replaceAll("        vii. ", "        7. ")
    .replaceAll("        viii. ", "        8. ")
    .replaceAll("            a. ", "            1. ")
    .replaceAll("            b. ", "            2. ")
    .replaceAll("            c. ", "            3. ")
    .replaceAll("            d. ", "            4. ")
    .replaceAll("            e. ", "            5. ")
    .replaceAll("            f. ", "            6. ")
    .replaceAll("            g. ", "            7. ")
    .replaceAll("            h. ", "            8. ");

  return parsedLists;
}

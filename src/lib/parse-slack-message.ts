export function parseSlackMessage(slackMessage: string) {
  const parsedSlackMessage = slackMessage
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

  return parsedSlackMessage;
}

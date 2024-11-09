import { expect, test } from "vitest";
import { parseSlackMessage } from "./parse-slack-message";

const slackMessageMock = `
*Test some copy that is formatted*
• First item of an unordered list
    ◦ First nested item of first item
    ◦ Second nested item of first item
    ◦ Third nested item of first item
• Second item of and unordered list
    ◦ First nested item of second item
        ▪︎ First nested item of first nested item of second item
            • First nested item of first nested item of first nested item second item
• Third item of an unordered list
_Here follows an ordered list_
1. First item of an ordered list
    a. First nested item of first item
    b. Second nested item of first item
    c. Third nested item of first item
2. Second item of an ordered list
    a. First nested item of second item
        i. First nested item of first nested item of second item
        ii. Second nested item of first nested item of second item
        iii. Third nested item of first nested item of second item
            1. First nested item of third nested of first nested item of second item
            2. Second nested item of third nested of first nested item of second item
            3. Third nested item of third nested of first nested item of second item
3. Third item of an ordered list
> A quote
~Some strikethrough text.~

<https://www.google.com|And a link>
`;

const parsedSlackMessage = `
**Test some copy that is formatted**
- First item of an unordered list
    - First nested item of first item
    - Second nested item of first item
    - Third nested item of first item
- Second item of and unordered list
    - First nested item of second item
        - First nested item of first nested item of second item
            - First nested item of first nested item of first nested item second item
- Third item of an unordered list
_Here follows an ordered list_
1. First item of an ordered list
    1. First nested item of first item
    2. Second nested item of first item
    3. Third nested item of first item
2. Second item of an ordered list
    1. First nested item of second item
        1. First nested item of first nested item of second item
        2. Second nested item of first nested item of second item
        3. Third nested item of first nested item of second item
            1. First nested item of third nested of first nested item of second item
            2. Second nested item of third nested of first nested item of second item
            3. Third nested item of third nested of first nested item of second item
3. Third item of an ordered list
> A quote
~~Some strikethrough text.~~

[And a link](https://www.google.com)
`;

test("parseSlackMessage", () => {
  expect(parseSlackMessage(slackMessageMock)).toBe(parsedSlackMessage);
});

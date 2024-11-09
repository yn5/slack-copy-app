import { parseSlackMessage } from "@/lib/parse-slack-message";

if (!process.env.SLACK_APP_ACCESS_TOKEN) {
  throw new Error("Missing SLACK_APP_ACCESS_TOKEN");
}

const slackAppAccessToken = process.env.SLACK_APP_ACCESS_TOKEN;

export async function POST(request: Request) {
  const body = await request.text();

  const urlParams = new URLSearchParams(body);
  const payload = JSON.parse(urlParams.get("payload") || "");
  const { message, trigger_id } = payload;
  console.log(JSON.stringify(message.text));

  const parsedSlackMessage = parseSlackMessage(message.text);

  await fetch("https://slack.com/api/views.open", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${slackAppAccessToken}`,
    },
    body: JSON.stringify({
      trigger_id,
      view: {
        type: "modal",
        callback_id: "copy-app-modal",
        title: {
          type: "plain_text",
          text: "Plain text",
        },
        blocks: [
          {
            type: "rich_text",
            elements: [
              {
                type: "rich_text_preformatted",
                elements: [
                  {
                    type: "text",
                    text: parsedSlackMessage,
                  },
                ],
                border: 0,
              },
            ],
          },
        ],
      },
    }),
  });

  return Response.json({});
}

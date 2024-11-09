import { parseSlackMessage } from "@/lib/parse-slack-message";

if (!process.env.SLACK_APP_ACCESS_TOKEN) {
  throw new Error("Missing SLACK_APP_ACCESS_TOKEN");
}

const slackAppAccessToken = process.env.SLACK_APP_ACCESS_TOKEN;

export async function POST(request: Request) {
  const body = await request.text();

  const urlParams = new URLSearchParams(body);
  const payload = JSON.parse(urlParams.get("payload") || "");
  const { message, trigger_id, type } = payload;

  if (type === "view_submission") {
    return Response.json({});
  }

  if (type !== "message_action") {
    return Response.json({});
  }

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
        submit: {
          type: "plain_text",
          text: "Done",
        },
        blocks: [
          {
            type: "rich_text",
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  {
                    type: "text",
                    text: "Press CMD+A and CMD+C to copy message text to clipboard",
                  },
                ],
              },
            ],
          },
          {
            type: "input",
            block_id: "message_text_input_block",
            element: {
              type: "plain_text_input",
              action_id: "message_text_input",
              initial_value: parsedSlackMessage,
              multiline: true,
            },
            label: {
              type: "plain_text",
              text: "Message text",
            },
          },
        ],
      },
    }),
  });

  return Response.json({});
}

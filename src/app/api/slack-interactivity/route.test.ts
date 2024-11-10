import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";

process.env.SLACK_APP_ACCESS_TOKEN = "test-access-token";

// Import the POST handler dynamically so environment variables are set
const { POST } = await import("./route");

describe("POST /api/slack-interactivity", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns an empty JSON response if type is view_submission", async () => {
    const payload = {
      type: "view_submission",
      message: {},
      trigger_id: "test-trigger-id",
    };

    const request = new Request("http://localhost/slack", {
      method: "POST",
      body: new URLSearchParams({ payload: JSON.stringify(payload) }),
    });

    const result = await POST(request);

    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({});
  });

  it("returns an empty JSON response if type is not message_action", async () => {
    const payload = {
      type: "other_action_type",
      message: {},
      trigger_id: "test-trigger-id",
    };

    const request = new Request("http://localhost/slack", {
      method: "POST",
      body: new URLSearchParams({ payload: JSON.stringify(payload) }),
    });

    const result = await POST(request);

    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({});
  });

  it("sends a request to Slack API with the correct payload and returns an empty JSON response", async () => {
    // @ts-expect-error Shows "Cannot find namespace 'vi'" in text editor
    // but that doesn't seem to be an actual issue
    (fetch as vi.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const payload = {
      type: "message_action",
      message: { text: "This is a test message" },
      trigger_id: "test-trigger-id",
    };

    const request = new Request("http://localhost/slack", {
      method: "POST",
      body: new URLSearchParams({ payload: JSON.stringify(payload) }),
    });

    const result = await POST(request);

    expect(fetch).toHaveBeenCalledWith("https://slack.com/api/views.open", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer test-access-token`,
      },
      body: JSON.stringify({
        trigger_id: "test-trigger-id",
        view: {
          type: "modal",
          callback_id: "copy-app-modal",
          title: {
            type: "plain_text",
            text: "Message text",
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
                initial_value: "This is a test message",
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

    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({});
  });

  it("handles Slack API errors gracefully", async () => {
    // @ts-expect-error Shows "Cannot find namespace 'vi'" in text editor
    // but that doesn't seem to be an actual issue
    (fetch as vi.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: false, error: "invalid_trigger" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const payload = {
      type: "message_action",
      message: { text: "This is a test message" },
      trigger_id: "invalid-trigger-id",
    };

    const request = new Request("http://localhost/slack", {
      method: "POST",
      body: new URLSearchParams({ payload: JSON.stringify(payload) }),
    });

    const result = await POST(request);

    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({});
  });

  it("returns 500 if an unexpected error occurs during the Slack API call", async () => {
    // @ts-expect-error Shows "Cannot find namespace 'vi'" in text editor
    // but that doesn't seem to be an actual issue
    (fetch as vi.Mock).mockRejectedValueOnce(new Error("Network error"));

    const payload = {
      type: "message_action",
      message: { text: "This is a test message" },
      trigger_id: "test-trigger-id",
    };

    const request = new Request("http://localhost/slack", {
      method: "POST",
      body: new URLSearchParams({ payload: JSON.stringify(payload) }),
    });

    const result = await POST(request);

    expect(result.status).toBe(500);
    expect(await result.json()).toEqual({
      error: "Something went wrong during the API call.",
    });
  });
});

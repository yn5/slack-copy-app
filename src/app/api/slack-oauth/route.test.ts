import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";

process.env.SLACK_CLIENT_ID = "test-client-id";
process.env.SLACK_CLIENT_SECRET = "test-client-secret";
process.env.SLACK_REDIRECT_URI = "https://yourapp.com/slack/oauth";

// Import the GET handler dynamically so the environment variables are
// set before it is imported.
const { GET } = await import("./route");

describe("GET /oauth", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear fetch mock calls after each test
  });

  it("returns 400 if the authorization code is missing", async () => {
    const request = new Request("http://localhost/oauth");

    const result = await GET(request);
    expect(result.status).toBe(400);
    expect(await result.json()).toEqual({
      error: "Authorization code is missing.",
    });
  });

  it("redirects on successful OAuth", async () => {
    // @ts-expect-error Shows "Cannot find namespace 'vi'" in text editor
    // but that doesn't seem to be an actual issue
    (fetch as vi.Mock).mockResolvedValueOnce(
      new Response(
        JSON.stringify({ ok: true, access_token: "fake-access-token" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const request = new Request("http://localhost/oauth?code=test-code");

    const result = await GET(request);
    expect(result.status).toBe(302);
    expect(result.headers.get("location")).toBe(
      "http://localhost/slack-oauth-success",
    );
  });

  it("returns 400 with Slack API error", async () => {
    // @ts-expect-error Shows "Cannot find namespace 'vi'" in text editor
    // but that doesn't seem to be an actual issue
    (fetch as vi.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: false, error: "invalid_code" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const request = new Request("http://localhost/oauth?code=invalid-code");

    const result = await GET(request);
    expect(result.status).toBe(400);
    expect(await result.json()).toEqual({ error: "invalid_code" });
  });

  it("returns 500 on unexpected network error", async () => {
    // @ts-expect-error Shows "Cannot find namespace 'vi'" in text editor
    // but that doesn't seem to be an actual issue
    (fetch as vi.Mock).mockRejectedValueOnce(new Error("Network error"));

    const request = new Request("http://localhost/oauth?code=test-code");

    const result = await GET(request);
    expect(result.status).toBe(500);
    expect(await result.json()).toEqual({
      error: "Something went wrong during the OAuth process.",
    });
  });
});

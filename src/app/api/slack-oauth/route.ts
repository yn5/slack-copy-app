if (!process.env.SLACK_CLIENT_ID) {
  throw new Error("Missing SLACK_CLIENT_ID");
}
if (!process.env.SLACK_CLIENT_SECRET) {
  throw new Error("Missing SLACK_CLIENT_SECRET");
}
if (!process.env.SLACK_REDIRECT_URI) {
  throw new Error("Missing SLACK_REDIRECT_URI");
}

const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const redirectUri = process.env.SLACK_REDIRECT_URI;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json(
      { error: "Authorization code is missing." },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }).toString(),
    });

    const data: {
      ok: boolean;
      error?: string;
      access_token?: string;
      [key: string]: unknown;
    } = await response.json();

    if (data.ok) {
      return Response.redirect(new URL("/slack-oauth-success", request.url));
    } else {
      return Response.json(
        { error: data.error ?? "Unknown error" },
        { status: 400 },
      );
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.error("OAuth error:", error);
    }

    return Response.json(
      { error: "Something went wrong during the OAuth process." },
      { status: 500 },
    );
  }
}

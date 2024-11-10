import Logo from "@/components/logo";
import React from "react";

export default function SlackOauthSuccessPage() {
  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <Logo />
      <h1 className="mb-4 text-2xl">Slack integration Successful!</h1>
      <p>The Slack Copy App has been installed to your Slack workspace.</p>
    </div>
  );
}

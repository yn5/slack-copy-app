import GithubLink from "@/components/github-link";
import Logo from "@/components/logo";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <Logo />
      <h1 className="mb-4 text-2xl">The Copy Slack App</h1>
      <a href="https://slack.com/oauth/v2/authorize?client_id=1567601987477.8019638029633&scope=commands&user_scope=">
        <Image
          alt="Add to Slack"
          height="40"
          width="139"
          src="https://platform.slack-edge.com/img/add_to_slack@2x.png"
        />
      </a>
      <GithubLink className="absolute bottom-16" />
    </div>
  );
}

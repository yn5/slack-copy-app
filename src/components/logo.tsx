import Image from "next/image";

export default function Logo() {
  return (
    <Image
      className="m-[32px]"
      src="/slack-copy-logo-src-icon.svg"
      width={96}
      height={96}
      alt="Slack Copy App logo source"
    />
  );
}

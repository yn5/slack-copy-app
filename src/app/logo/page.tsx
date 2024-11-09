import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Image
        className="m-[64px]"
        src="/slack-copy-logo-src-icon.svg"
        width={192}
        height={192}
        alt="Slack Copy App logo source"
      />
    </div>
  );
}

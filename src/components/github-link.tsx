import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export default function GithubLink({ className }: { className?: string }) {
  return (
    <Link
      href="https://github.com/yn5/slack-copy-app"
      className={clsx(className, "flex items-center")}
    >
      <Image src="/github-mark.svg" width={32} height={32} alt="Github Mark" />
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import GitHubIcon from "@/asset/github.svg";
import { buttonVariants } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-background border-b border-border w-full py-2 md:py-4 mb-4 flex flex-row justify-between px-4 md:px-6 shadow shadow-accent">
      <Link className="font-bold text-2xl" href="/">
        LLMPrice.fyi
      </Link>
      <Link
        href="https://github.com/Siddhesh-Agarwal/llm-price-calculator"
        target="_blank"
        className={buttonVariants({ size: "icon", variant: "ghost" })}
      >
        <Image src={GitHubIcon} alt="GitHub" className="w-6 h-6 rounded" />
      </Link>
    </header>
  );
}

import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./ui/icons";

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
        <Icons.github />
      </Link>
    </header>
  );
}

import GitHubIcon from "@/asset/github.svg"
import Link from "next/link";
import Image from "next/image";


export default function Header() {
    return (
        <header className="bg-background border-b border-border w-full py-2 md:py-4 mb-4 flex flex-row justify-between px-4 md:px-6 shadow shadow-accent">
            <Link className='font-bold text-2xl text-gray-900 dark:text-gray-100' href='/'>
                LLMPrice.fyi
            </Link>
            <Link
                href="https://github.com/Siddhesh-Agarwal/llm-price-calculator"
                target="_blank"
                rel="noreferrer"
                className='hover:bg-slate-300 dark:hover:bg-slate-700 py-1 px-2 rounded-lg'
            >
                <Image src={GitHubIcon} alt="GitHub" className='w-6 h-6 rounded' />
            </Link>
        </header>
    )
}
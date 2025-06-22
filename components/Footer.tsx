import HeartIcon from "@/asset/heart.svg"
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border text-center w-full py-4 mt-4 absolute z-50 bottom-0">
            <h1 className='font-bold text-gray-900 dark:text-gray-100'>
                Made by <Link href="https://github.com/Siddhesh-Agarwal" target="_blank" rel="noreferrer" className='hover:underline text-blue-600'>Siddhesh Agarwal</Link> with <Image src={HeartIcon} alt="Heart" className='w-4 h-4 inline' />
            </h1>
        </footer>
    )
}
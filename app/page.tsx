import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col">
      <section className="flex align-center justify-center bg-white dark:bg-gray-900">
        <div className="flex align-center flex-col justify-center lg:flex-row py-8 px-4 mx-auto max-w-screen-xl lg:py-20 lg:px-12">
          <div className="sm:text-left text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl">
              The Future of Marriage Commitment
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl">
              Experience the revolution in marriage registration. Our
              blockchain-based platform provides a secure, efficient, and
              transparent way to vow your commitment.
            </p>
            <Button variant="outline" className="mb-8" asChild>
              <Link href="https://github.com/ITZSHOAIB/vowed-on-chain/blob/master/contracts/VowedOnChain.sol">
                <Github className="mr-2 h-4 w-4" /> Read the Contract
              </Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/landing.svg"
              width={600}
              height={400}
              alt="Screenshots of the dashboard project showing desktop version"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

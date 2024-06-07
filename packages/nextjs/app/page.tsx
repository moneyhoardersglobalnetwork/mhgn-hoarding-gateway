"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center bg-black flex-col flex-grow pt-10">
        <div>
          <Image alt="Gateway2 logo" className="cursor-pointer" src="/hoarder.png" width={1000} height={600} />
        </div>
        <div className="px-5">
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <p className="text-center text-lg">
            Get started by grabbing some BOP from the faucet{" "}
            <div>
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
                https://bop-by-mhgn-faucet-moneyhoardersglobalnetwork.vercel.app/
              </code>
            </div>
          </p>
        </div>

        <div className="flex-grow bg-black w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-white px-10 py-10 text-black text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-" />
              <p>
                Fully interact with all Hoarding Gateway Contracts{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-white px-10 py-10 text-black text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-primary" />
              <p>
                Explore more on MHGN Official Site{" "}
                <Link href="https://moneyhoardersglobal.net" passHref className="link">
                  Visit MHGN
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

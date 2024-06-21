"use client";

import Image from "next/image";
import Link from "next/link";
import { formatEther, formatUnits } from "ethers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ArrowTopRightOnSquareIcon, BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { data: bopTokenSymbol } = useScaffoldReadContract({
    contractName: "BopToken",
    functionName: "symbol",
  });

  const { data: bopTokenBalance } = useScaffoldReadContract({
    contractName: "BopToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: mhgdTokenSymbol } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "symbol",
  });

  const { data: mhgdTokenBalance } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: daiTokenSymbol } = useScaffoldReadContract({
    contractName: "DaiToken",
    functionName: "symbol",
  });

  const { data: daiTokenBalance } = useScaffoldReadContract({
    contractName: "DaiToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: wbopTokenSymbol } = useScaffoldReadContract({
    contractName: "WBOP",
    functionName: "symbol",
  });

  const { data: wbopTokenBalance } = useScaffoldReadContract({
    contractName: "WBOP",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: usdcTokenBalance } = useScaffoldReadContract({
    contractName: "IERC20",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  return (
    <>
      <div className="flex items-center bg-black flex-col flex-grow pt-10">
        <div>
          <Image alt="Gateway logo" className="cursor-pointer" src="/hoarder.png" width={1500} height={300} />
        </div>
        <div className="px-5">
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <div className="flex justify-center items-center space-x-2">
            <p>
              {" "}
              <div className="text-xl text-white items-center justify-center">
                <div className="justify-center text-center">(MHGN Hoarding Gateway Assets) </div>
              </div>
              <div className="text-xl text-white text-center">
                <div className="inline-flex items-center justify-center text-white">
                  {parseFloat(formatEther(bopTokenBalance || "0")).toFixed(2)}
                  <span className="font-bold ml-1">{bopTokenSymbol}</span>
                </div>
              </div>
              <div>
                <div className="text-xl text-white text-center">
                  <div className="inline-flex items-center justify-center text-white">
                    {parseFloat(formatEther(wbopTokenBalance || "0")).toFixed(2)}
                    <span className="font-bold ml-1">{wbopTokenSymbol}</span>
                  </div>
                </div>
              </div>
              <div className="text-xl text-white text-center">
                <div className="inline-flex items-center justify-center text-white">
                  {parseFloat(formatEther(mhgdTokenBalance || "0")).toFixed(2)}
                  <span className="font-bold ml-1">{mhgdTokenSymbol}</span>
                </div>
              </div>
              <div className="text-xl text-white text-center">
                <div className="inline-flex items-center justify-center text-white">
                  {parseFloat(formatEther(daiTokenBalance || "0")).toFixed(2)}
                  <span className="font-bold ml-1">{daiTokenSymbol}</span>
                </div>
              </div>
              <div className="text-xl text-white text-center">
                <div className="inline-flex items-center justify-center text-white">
                  {Number.parseFloat(formatUnits(usdcTokenBalance || "0", 6))}
                  <span className="font-bold ml-1">USDC</span>
                </div>
              </div>
            </p>
          </div>

          <p className="text-center text-lg">
            Get started by grabbing some BOP from the faucet{" "}
            <div>
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
                https://bop-by-mhgn-faucet-moneyhoardersglobalnetwork.vercel.app/
              </code>
            </div>
            Welcome Hoarders the MHGN Hoarding Gateway is unlocked!
            <div>
              It allows users of the MHGN ecosystem defined as hoarders to access MHGN Hoarder Labs products and
              services.
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
              <ArrowTopRightOnSquareIcon className="h-8 w-8 fill-" />
              <p>
                There is even more to explore, check out{" "}
                <div>
                  {" "}
                  <Link href="/usdc-cross-chain-hoarding-amoy" passHref className="link">
                    USDC Cross-Chain Hoarding
                  </Link>{" "}
                </div>
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-white px-10 py-10 text-black text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-primary" />
              <p>
                Stay connected{" "}
                <div>
                  <Link href="https://moneyhoardersglobal.net" passHref className="link">
                    Visit MHGN Offical Website
                  </Link>{" "}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

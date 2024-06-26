"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatEther } from "ethers";
import { useAccount } from "wagmi";
import {
  useScaffoldContract,
  useScaffoldEventHistory,
  useScaffoldReadContract,
  useScaffoldWatchContractEvent,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";

export const MhgdHoardingContractData = () => {
  const { address } = useAccount();

  const { data: mhgdTokenSymbol } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "symbol",
  });

  const { data: mhgdTokenBalance } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: mhgdTokenAllowance } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "allowance",
    args: [address, "0x5f0f89Adaa0f406317BF714803b51c9Aff3Ba61c"],
  });

  const { data: hoardingBalance } = useScaffoldReadContract({
    contractName: "MhgdHoardingContract",
    functionName: "Check_Mhgd_Hoarded_Balance",
    args: [address],
  });

  const { data: calculateReward } = useScaffoldReadContract({
    contractName: "MhgdHoardingContract",
    functionName: "calculateReward",
    args: [address],
  });

  const { data: GetHoardingingTimeInSeconds } = useScaffoldReadContract({
    contractName: "MhgdHoardingContract",
    functionName: "Get_HoardingingTime_InSeconds",
    args: [address],
  });

  const { data: totalHoarded } = useScaffoldReadContract({
    contractName: "MhgdHoardingContract",
    functionName: "hoarders",
    args: [address],
  });

  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "totalSupply",
  });

  const { data: Total_Hoarders } = useScaffoldReadContract({
    contractName: "MhgdHoardingContract",
    functionName: "Total_Hoarders",
  });

  const { data: Total_Reward_Pool } = useScaffoldReadContract({
    contractName: "MhgdHoardingContract",
    functionName: "Total_Reward_Pool",
  });

  const { data: hoarded } = useScaffoldReadContract({
    contractName: "MhgdHoardingContract",
    functionName: "totalHoarded",
  });

  const {
    data: hoardedEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "MhgdHoardingContract",
    eventName: "Hoarded",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
    filters: { user: address },
    blockData: true,
  });

  console.log("Events:", isLoadingEvents, errorReadingEvents, hoardedEvents);

  const { data: mhgdHoardingContract } = useScaffoldContract({ contractName: "MhgdHoardingContract" });
  console.log("mhgdHoardingContract: ", mhgdHoardingContract);

  return (
    <div className="flex flex-col justify-center items-center bg-black bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div
        className={`flex flex-col max-w-full items-center bg-black bg-opacity-100 rounded-2xl shadow-lg px-5 py-4 w-full }`}
      >
        <div className="text-6xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          Welcome Hoarder
        </div>
        This is the MHGD User Interface
        <div className="flex relative w-40 h-40">
          <Image alt="SE2 logo" className="cursor-pointer" src="/mhgd_logo.png" width={120} height={100} />
        </div>
      </div>
      <p>
        {" "}
        <div className="text-xl text-white">
          Your wallet balance:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {parseFloat(formatEther(mhgdTokenBalance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{mhgdTokenSymbol}</span>
          </div>
        </div>
      </p>
      <p>
        {" "}
        <div className="text-xl text-white">
          Hoarding Contract Allowance:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {parseFloat(formatEther(mhgdTokenAllowance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{mhgdTokenSymbol}</span>
          </div>
        </div>
      </p>
      <p>
        {" "}
        <div className="text-xl text-white">
          You Hoarded:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {parseFloat(formatEther(hoardingBalance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{mhgdTokenSymbol}</span>
          </div>
        </div>
      </p>
      <div className="block justify-between w-full">
        <div className="bg-[url('/assets/background.jpeg')] border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min text-white">Total Hoarders</div>
          <div className="text-2xl text-white text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {Total_Hoarders?.toString() || "0"}
          </div>
        </div>
        <div className="bg-[url('/assets/background.jpeg')] border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min text-white">Total Reward Pool</div>
          <div className="text-2xl text-white text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {parseFloat(formatEther(Total_Reward_Pool || "0")).toFixed(2)}
          </div>
        </div>
        <div className="bg-[url('/assets/background.jpeg')] border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min text-white">Total Hoarded</div>
          <div className="text-2xl text-white text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {parseFloat(formatEther(hoarded || "0")).toFixed(2)}
          </div>
        </div>
        <div className="bg-[url('/assets/background.jpeg')] border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min text-white">Hoarding Stats</div>
          <div className="text-2xl text-white text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {totalHoarded?.toString() || "0"}
          </div>
        </div>
        <div>
          <div className="flex justify-between w-full">
            <div className="bg-[url('/assets/background.jpeg')] border border-primary rounded-xl flex">
              <div className="p-2 py-1 border-r border-primary flex items-top w-min text-white">Total Supply</div>
              <div className="text-2xl text-white text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
                {parseFloat(formatEther(totalSupply || "0")).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p></p>
      <div className="grid lg:grid-cols-3 flex-grow">
        <div className="bg-[url('/assets/background.jpeg')] border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min text-white">
            Hoarding Time in Seconds
          </div>
          <div className="text-2xl text-white text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {GetHoardingingTimeInSeconds?.toString() || "0"}
          </div>
        </div>
        <div></div>
        <div className="grid lg:grid-cols-1 flex-grow">
          <div className="bg-[url('/assets/background.jpeg')] border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-top w-min text-white">Pending Rewards</div>
            <div className="text-2xl text-white text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {parseFloat(formatEther(calculateReward || "0")).toFixed(4)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

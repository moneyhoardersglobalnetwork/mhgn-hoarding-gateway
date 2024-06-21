"use client";

import { useEffect, useRef, useState } from "react";
import { formatEther, formatUnits } from "ethers";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldEventHistory,
  useScaffoldReadContract,
  useScaffoldWatchContractEvent,
} from "~~/hooks/scaffold-eth";

export const MintContractData = () => {
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
    args: [address, "0x64B5bA45B5F02c72512C336a12284Dd8f58ef1d8"],
  });

  const { data: daiTokenSymbol } = useScaffoldReadContract({
    contractName: "DaiToken",
    functionName: "symbol",
  });

  const { data: daiTokenBalance } = useScaffoldReadContract({
    contractName: "DaiToken",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: daiTokenAllowance } = useScaffoldReadContract({
    contractName: "DaiToken",
    functionName: "allowance",
    args: [address, "0x64B5bA45B5F02c72512C336a12284Dd8f58ef1d8"],
  });

  const { data: totalMintTrans } = useScaffoldReadContract({
    contractName: "MhgdDaiMint",
    functionName: "Total_Mint_Transactions",
  });

  const { data: minterHasMinted } = useScaffoldReadContract({
    contractName: "MhgdDaiMint",
    functionName: "Total_AllTime_Minted",
  });

  const { data: daiReserveBalance } = useScaffoldReadContract({
    contractName: "MhgdDaiMint",
    functionName: "daiReserve",
  });

  const { data: mhgdReserveBalance } = useScaffoldReadContract({
    contractName: "MhgdDaiMint",
    functionName: "mhgdReserve",
  });

  return (
    <div className="flex flex-col justify-center items-center bg-black bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div className="flex justify-center w-full">
        <div className="bg-white border border-primary rounded-xl flex">
          <div className="text-black p-2 py-1 border-r border-primary flex items-center">Mint Transactions</div>
          <div className="text-black text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {totalMintTrans?.toString() || "0"}
          </div>
        </div>
      </div>
      <div className="bg-white border border- rounded-xl flex">
        <div className="text-black text-3xl p-2 py-1 border-r border-primary flex items-center">Mint Has Minted</div>
        <div className="text-black text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(minterHasMinted || "0")).toFixed(2)}
        </div>
      </div>
      <div className="bg-white border border- rounded-xl flex">
        <div className="text-black text-3xl p-2 py-1 border-r border-primary flex items-center">DAI Reserve</div>
        <div className="text-black text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(daiReserveBalance || "0")).toFixed(2)}
        </div>
      </div>
      <div className="bg-white border border- rounded-xl flex">
        <div className="text-black text-3xl p-2 py-1 border-r border-primary flex items-center">MHGD Reserve</div>
        <div className="text-black text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(mhgdReserveBalance || "0")).toFixed(2)}
        </div>
      </div>
      <div className="text-xl text-white">
           wallet balance:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {parseFloat(formatEther(mhgdTokenBalance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{mhgdTokenSymbol}</span>
          </div>
    </div>
    <div className="text-xl text-white">
           wallet balance:{" "}
          <div className="inline-flex items-center justify-center text-white">
          {parseFloat(formatEther(daiTokenBalance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{daiTokenSymbol}</span>
          </div>
          
          <div className="text-xl text-white">
           MHGD Allowance:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {parseFloat(formatEther(mhgdTokenAllowance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{mhgdTokenSymbol}</span>
          </div>
        </div>
        <div className="text-xl text-white">
           DAI Allowance:{" "}
          <div className="inline-flex items-center justify-center text-white">
          {parseFloat(formatEther(daiTokenAllowance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{daiTokenSymbol}</span>
          </div>
        </div>
    </div>
    </div>
  );
};

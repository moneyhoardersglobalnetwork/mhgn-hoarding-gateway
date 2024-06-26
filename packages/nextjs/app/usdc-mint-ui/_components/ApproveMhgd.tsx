"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { formatEther } from "ethers";
import { CopyIcon } from "../assets/CopyIcon";
import { DiamondIcon } from "../assets/DiamondIcon";
import { HareIcon } from "../assets/HareIcon";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldWriteContract, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const ApproveMhgd = () => {
  const [visible, setVisible] = useState(true);
  const [amount, approve_amount] = useState("");
  const address = "0x4B4eb09800e577471B903286f5d7BD2BeFB5d31a";
  const { writeContractAsync } = useScaffoldWriteContract("MhgdToken");

  const { data: mhgdTokenAllowance } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "allowance",
    args: [address, "0x4B4eb09800e577471B903286f5d7BD2BeFB5d31a"],
  });

  const { data: mhgdTokenSymbol } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "symbol",
  });

  return (
    <div className="flex  relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20 items-center">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex flex-col mt-6 px-7 py-8 bg-white opacity-100 rounded-2xl shadow-lg border-2 border-primary">
            <span className="text-4xl sm:text-6xl text-black">Approve MHGD</span>
            <div className="text-xl text-black">
          Hoarding Contract Allowance:{" "}
          <div className="inline-flex items-center justify-center text-black">
            {parseFloat(formatEther(mhgdTokenAllowance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{mhgdTokenSymbol}</span>
          </div>
        </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
              <input
                type="uint256"
                placeholder="Amount"
                className="input font-bai-jamjuree w-full px-5 bg-white bg-[length:100%_100%] border border-primary text-primary text-lg sm:text-2xl placeholder-black uppercase"
                onChange={e => approve_amount(e.target.value)}
              />
              <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
                <div className="flex rounded-full border-2 border-primary p-1">
                <button
              className="btn btn-primary uppercase"
                    onClick={async () => {
                      try {
                        await writeContractAsync({ functionName: "approve", args: [address, BigInt(amount)] });
                      } catch (err) {
                        console.error("Error calling execute function");
                      }
                    }}
            >
              Approve!
            </button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 items-start">
              <span className="text-sm leading-tight">Conversion:</span>
              <div className="badge badge-warning">1 MHGD = 1000000000000000000 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
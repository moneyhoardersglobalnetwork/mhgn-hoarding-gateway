"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { CopyIcon } from "../assets/CopyIcon";
import { DiamondIcon } from "../assets/DiamondIcon";
import { HareIcon } from "../assets/HareIcon";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const ApproveWbop = () => {
  const [visible, setVisible] = useState(true);
  const [amount, approve_amount] = useState("");
  const address = "0x9E5Aa68A04F9E28150bDE61BC416362B56F8A2A4";
  const { writeContractAsync } = useScaffoldWriteContract("WBOP");

  return (
    <div className="flex  relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20 items-center">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex flex-col mt-6 px-7 py-8 bg-white opacity-100 rounded-2xl shadow-lg border-2 border-primary">
            <span className="text-4xl sm:text-6xl text-black">Approve WBOP</span>

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
              <div className="badge badge-warning">1 WBOP = 1000000000000000000 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

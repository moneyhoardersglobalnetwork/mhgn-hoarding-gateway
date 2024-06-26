"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { TransactionReceipt } from "viem";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const ApproveMhgd = () => {
  const [visible, setVisible] = useState(true);
  const [amount, approve_amount] = useState("");
  const address = "0x5f0f89Adaa0f406317BF714803b51c9Aff3Ba61c";
  const { writeContractAsync } = useScaffoldWriteContract("MhgdToken");

  return (
    <div className="flex bg-black relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20 items-center">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex flex-col mt-6 px-7 py-8 bg-[url('/assets/background.jpeg')] opacity-100 rounded-2xl shadow-lg border-2 border-primary">
            <span className="text-4xl sm:text-6xl text-white">Approve MHGD</span>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
              <input
                type="uint256"
                placeholder="Amount"
                className="input font-bai-jamjuree w-full px-5 bg-white bg-[length:100%_100%] border border-primary text-black text-lg sm:text-2xl placeholder-black uppercase"
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
          </div>
        </div>
      </div>
    </div>
  );
};

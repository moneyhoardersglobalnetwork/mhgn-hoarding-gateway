"use client";

import { useState } from "react";
import { TransactionReceipt } from "viem";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const [visible, setVisible] = useState(true);
  const [newGreeting, setNewGreeting] = useState<string | undefined>(undefined);
  const { writeContractAsync } = useScaffoldWriteContract("YourContract");

  return (
    <div className="flex bg-black relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex gap-5 bg-white bg-opacity-80 z-0 p-7 rounded-2xl shadow-lg">
            <span className="text-3xl">👋🏻</span>
            <div>
              <div className="text-black">
                In this page you can interact with the <strong>BOP Token</strong> quickly import to your wallet using
                the contract address 0x2C3aFc7E571cAF77C52505c46c33Bb493BF48264
              </div>
              <div className="mt-2 text-black">
                Remember <code className="italic bg-white text-base font-bold [word-spacing:-0.5rem]">BOP</code> has 18
                decimal places like ETH so sending 1 BOP using this interface would look like this 1 BOP =
                <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem]"></code>
                1000000000000000000 .
                <code />
              </div>
            </div>
          </div>
          <button
            className="btn btn-circle btn-ghost h-6 w-6 bg-base-200 bg-opacity-80 z-0 min-h-0 drop-shadow-md"
            onClick={() => setVisible(false)}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col mt-6 px-7 py-8 bg-[url('/assets/background.jpeg')] opacity-100 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-white">Set a Greeting_</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Write your greeting here"
              className="input font-bai-jamjuree w-full px-5 bg-white bg-[length:100%_100%] border border-primary  text-black text-lg sm:text-2xl placeholder-black uppercase"
              onChange={e => setNewGreeting(e.target.value)}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary uppercase"
                  onClick={async () => {
                    try {
                      {
                        await writeContractAsync({ functionName: "setGreeting", args: [newGreeting] });
                      }
                    } catch (err) {
                      console.error("Error calling execute function");
                    }
                  }}
                >
                  Send!
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

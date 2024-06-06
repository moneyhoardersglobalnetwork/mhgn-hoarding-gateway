"use client";

import { useState } from "react";
import { CopyIcon } from "../assets/CopyIcon";
import { DiamondIcon } from "../assets/DiamondIcon";
import { HareIcon } from "../assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const SwapMhgd = () => {
  const [visible, setVisible] = useState(true);
  const [daiAmount, setDaiAmount] = useState("");
  const { writeContractAsync } = useScaffoldWriteContract("MhgdDaiMint");

  return (
    <div className="grid justify-center  items-center bg-black relative pb-10">
      <DiamondIcon className="absolute top-0 left-36" />
      <CopyIcon className="absolute bottom-0 left-36" />
      <HareIcon className="absolute right-0 bottom-24" />
      <div className="flex flex-col w-md mx-5 sm:mx-8 2xl:mx-20">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex gap-5 bg-white bg-opacity-100 text-black z-0 p-7 rounded-2xl shadow-lg">
            Swap for DAI
            <div>
              <div className="flex  relative pb-10">
                <div className="flex flex-col  w-md mx-5 sm:mx-8 2xl:mx-20">
                  <div className="flex flex-col mt-6 px-7 py-8 bg-white opacity-100 rounded-2xl shadow-lg border-2 border-primary">
                    <span className="text-4xl sm:text-6xl text-black">Swap MHGD</span>

                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
                      <input
                        type="text"
                        placeholder="Amount"
                        className="input text-black font-bai-jamjuree w-full px-5 bg-white bg-[length:100%_100%] border border-primary  text-lg sm:text-2xl placeholder-black uppercase"
                        onChange={e => setDaiAmount(e.target.value)}
                      />
                      <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
                        <div className="flex rounded-full border-2 border-primary p-1">
                          <button
                            className="btn btn-primary uppercase"
                            onClick={async () => {
                              try {
                                await writeContractAsync({ functionName: "swapMhgd", args: [BigInt(daiAmount)] });
                              } catch (err) {
                                console.error("Error calling execute function");
                              }
                            }}
                          >
                            Swap!
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2 items-start">
                      <span className="text-sm leading-tight">Price:</span>
                      <div className="badge badge-warning">0.01 DAI + Gas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { ApproveDai } from "./_components/ApproveDai";
import { ApproveMhgd } from "./_components/ApproveMhgd";
import { Mint } from "./_components/Mint";
import { MintContractData } from "./_components/MintContractData";
import { SwapDai } from "./_components/SwapDai";
import { SwapMhgd } from "./_components/SwapMhgd";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "MHGD-DAI MINT UI",
  description: "Interface for interacting with the MHGD & USDC smart contracts",
});

const DAIMINTUI: NextPage = () => {
  return (
    <>
      <div className="text-center  bg-black p-10">
        <MintContractData />
        <ApproveDai />
        <ApproveMhgd />
        <Mint />
        <SwapDai />
        <SwapMhgd />

        <h1 className="text-4xl my-0">MHGD-DAI MINT</h1>
        <p className="text-neutral">
          Allows hoarders to interact with the MHGD & USDC smart contracts.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / debug / page.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default DAIMINTUI;

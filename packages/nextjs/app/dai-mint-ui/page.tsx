
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { ApproveMhgd } from "./_components/ApproveMhgd";
import { ApproveDai } from "./_components/ApproveDai";
import { MintContractData } from "./_components/MintContractData";
import { Mint } from "./_components/Mint";
import { SwapMhgd } from "./_components/SwapMhgd";
import { SwapDai } from "./_components/SwapDai";


export const metadata = getMetadata({
  title: "MHGD-USDC MINT UI",
  description: "Interface for interacting with the MHGD & USDC smart contracts",
});

const USDCMINTUI: NextPage = () => {
  return (
    <>
        <MintContractData />
        <ApproveDai />
        <ApproveMhgd />
        <Mint />
        <SwapDai />
        <SwapMhgd />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">MHGD-USDC MINT</h1>
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

export default USDCMINTUI;

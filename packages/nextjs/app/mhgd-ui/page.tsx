
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { ApproveMhgd } from "./_components/ApproveMhgd";
import { MhgdHoardingContractData } from "./_components/MhgdHoardingContractData";
import { Claim } from "./_components/Claim";
import { ContractData } from "./_components/ContractData";
import { ContractInteraction } from "./_components/ContractInteraction";
import { DonateMhgd } from "./_components/DonateMhgd";
import { Hoard } from "./_components/Hoard";
import { IncreaseHoard } from "./_components/IncreaseHoard";
import { UnHoard } from "./_components/UnHoard";

export const metadata = getMetadata({
  title: "MHGD UI",
  description: "Interface for interacting with the BOP smart contracts",
});

const MHGDUI: NextPage = () => {
  return (
    <>
         <ContractData />
        <MhgdHoardingContractData />
        <ContractInteraction />
        <ApproveMhgd />
        <DonateMhgd />
        <Hoard />
        <IncreaseHoard />
        <UnHoard />
        <Claim />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">MHGD UI</h1>
        <p className="text-neutral">
          Allows hoarders to interact with the BOP smart contracts.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / debug / page.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default MHGDUI;

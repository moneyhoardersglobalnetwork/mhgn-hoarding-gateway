
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { ApproveBop } from "./_components/ApproveBop";
import { BopHoardingContractData } from "./_components/BopHoardingContractData";
import { Claim } from "./_components/Claim";
import { ContractData } from "./_components/ContractData";
import { ContractInteraction } from "./_components/ContractInteraction";
import { DonateBop } from "./_components/DonateBop";
import { Hoard } from "./_components/Hoard";
import { IncreaseHoard } from "./_components/IncreaseHoard";
import { UnHoard } from "./_components/UnHoard";

export const metadata = getMetadata({
  title: "BOP UI",
  description: "Interface for interacting with the BOP smart contracts",
});

const BOPUI: NextPage = () => {
  return (
    <>
         <ContractData />
        <BopHoardingContractData />
        <ContractInteraction />
        <ApproveBop />
        <DonateBop />
        <Hoard />
        <IncreaseHoard />
        <UnHoard />
        <Claim />
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">BOP UI</h1>
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

export default BOPUI;

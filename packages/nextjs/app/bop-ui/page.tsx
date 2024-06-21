import { ApproveBop } from "./_components/ApproveBop";
import { BopHoardingContractData } from "./_components/BopHoardingContractData";
import { Claim } from "./_components/Claim";
import { ContractData } from "./_components/ContractData";
import { ContractInteraction } from "./_components/ContractInteraction";
import { DonateBop } from "./_components/DonateBop";
import { Hoard } from "./_components/Hoard";
import { IncreaseHoard } from "./_components/IncreaseHoard";
import { UnHoard } from "./_components/UnHoard";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "BOP UI",
  description: "Interface for interacting with the BOP smart contracts",
});

const BOPUI: NextPage = () => {
  return (
    <>
      <div className="text-center  bg-black p-10">
        <ContractData />
        <BopHoardingContractData />
        <ContractInteraction />
        <ApproveBop />
        <DonateBop />
        <Hoard />
        <IncreaseHoard />
        <UnHoard />
        <Claim />

        <h1 className="text-4xl my-0">BOP UI</h1>
        <p className="text-neutral">
          Allows hoarders to interact with the BOP smart contracts.
          <br /> Breakdown{" "}
          <div>
            <code className="italic  text-base font-bold  px-1">
              BOP by MHGN is a digital commodity asset that is used to support the MHGN ecosystem.
            </code>{" "}
          </div>
        </p>
      </div>
    </>
  );
};

export default BOPUI;

"use client";

import { formatEther, formatUnits } from "ethers";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const MintContractData = () => {
  const { address } = useAccount();

  const { data: mhgdTokenSymbol } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "symbol",
  });

  const { data: mhgdTokenBalance } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: mhgdTokenAllowance } = useScaffoldReadContract({
    contractName: "MhgdToken",
    functionName: "allowance",
    args: [address, "0x4B4eb09800e577471B903286f5d7BD2BeFB5d31a"],
  });

  const { data: usdcTokenBalance } = useScaffoldReadContract({
    contractName: "IERC20",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: usdcTokenAllowance } = useScaffoldReadContract({
    contractName: "IERC20",
    functionName: "allowance",
    args: [address, "0x4B4eb09800e577471B903286f5d7BD2BeFB5d31a"],
  });

  const { data: totalMintTrans } = useScaffoldReadContract({
    contractName: "MhgdUsdcMint",
    functionName: "Total_Mint_Transactions",
  });

  const { data: minterHasMinted } = useScaffoldReadContract({
    contractName: "MhgdUsdcMint",
    functionName: "Total_AllTime_Minted",
  });

  const { data: usdcReserveBalance } = useScaffoldReadContract({
    contractName: "MhgdUsdcMint",
    functionName: "usdcReserve",
  });

  const { data: mhgdReserveBalance } = useScaffoldReadContract({
    contractName: "MhgdUsdcMint",
    functionName: "mhgdReserve",
  });

  return (
    <div className="flex flex-col justify-center items-center bg-black bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div className="flex justify-center w-full">
        <div className="bg-white border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary text-black flex items-center">Mint Transactions</div>
          <div className="text-4xl text-black text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {totalMintTrans?.toString() || "0"}
          </div>
        </div>
      </div>
      <div className="bg-white border border- rounded-xl flex">
        <div className="text-3xl p-2 py-1 border-r border-primary text-black flex items-center">Mint Has Minted</div>
        <div className="text-4xl text-black text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(minterHasMinted || "0")).toFixed(2)}
        </div>
      </div>
      <div className="bg-white border border- rounded-xl flex">
        <div className="text-3xl p-2 py-1 border-r border-primary text-black flex items-center">USDC Reserve</div>
        <div className="text-4xl text-black text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {Number.parseFloat(formatUnits(usdcReserveBalance || "0", 6))}
        </div>
      </div>
      <div className="bg-white border border- rounded-xl flex">
        <div className="text-3xl p-2 py-1 border-r border-primary text-black flex items-center">MHGD Reserve</div>
        <div className="text-4xl text-black text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          {parseFloat(formatEther(mhgdReserveBalance || "0")).toFixed(2)}
        </div>
      </div>
      <div className="text-xl text-white">
        wallet balance:{" "}
        <div className="inline-flex items-center justify-center text-white">
          {parseFloat(formatEther(mhgdTokenBalance || "0")).toFixed(2)}
          <span className="font-bold ml-1">{mhgdTokenSymbol}</span>
        </div>
      </div>
      <div className="text-xl text-white">
        wallet balance:{" "}
        <div className="inline-flex items-center justify-center text-white">
          {Number.parseFloat(formatUnits(usdcTokenBalance || "0", 6))}
          <span className="font-bold ml-1">USDC</span>
        </div>
        <div className="text-xl text-white">
          MHGD Allowance:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {parseFloat(formatEther(mhgdTokenAllowance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{mhgdTokenSymbol}</span>
          </div>
        </div>
        <div className="text-xl text-white">
          USDC Allowance:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {Number.parseFloat(formatUnits(usdcTokenAllowance || "0", 6))}
            <span className="font-bold ml-1">USDC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

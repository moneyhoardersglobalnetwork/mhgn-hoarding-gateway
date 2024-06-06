// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IwbopToken {
    function mint(address, uint256) external;
    function balanceOf(address, uint256) external;
    function transfer(address, uint256) external;
}

contract WBOPMint is ReentrancyGuard {
    address public immutable owner;
      struct Minter {
        uint256 minted;
        uint256 mintedAtBlock;
        bool hasMintedBefore;
        uint256 minter_AllTime_Minted;
    }


    uint256 public constant SWAP_FEE = 1e16; // 0.01 BOP
    uint256 public Total_Mint_Transactions = 0;
    uint256 public Total_Wbop_Swap_Transactions = 0;
    uint256 public Total_Bop_Swap_Transactions = 0;
    uint256 public Total_AllTime_Minted;
    mapping (address => Minter) public minters;

    IERC20 public bopToken;
    IwbopToken public wbopToken;
    uint256 public bopReserve;
    uint256 public wbopReserve;
    uint256 public feesCollected;
    
    

    constructor (address _owner) {
        // Address of the BOP token on Sepolia
        bopToken = IERC20(0x76f9d116a4263b0b193E3174bC5b52946B10548b);
        // Address of the wbopToken contract Sepolia
        wbopToken = IwbopToken(0x649220e012e6D760502964b56B5a7E387084cA8C); //Update this address
        owner = _owner;
    }

    	// Modifier: used to define a set of rules that must be met before or after a function is executed
	// Check the withdraw() function
	modifier isOwner() {
		// msg.sender: predefined variable that represents address of the account that called the current function
		require(msg.sender == owner, "Not the Owner");
		_;
	}

    /**
     * @dev Mints an equivalent amount of wbopToken for the transferred BOP
     */
    function mint(uint256 bopAmount) external nonReentrant {
        require(bopToken.balanceOf(msg.sender) >= 0, "You need more BOP to Mint Wbop Tokens SORRY!");
        require(bopToken.transferFrom(msg.sender, address(this), bopAmount), "Transfer of BOP failed");
        wbopToken.mint(msg.sender, bopAmount);
        minters[msg.sender].minted += bopAmount;
        minters[msg.sender].mintedAtBlock = block.timestamp;
        minters[msg.sender].hasMintedBefore = true;
        minters[msg.sender].minter_AllTime_Minted += bopAmount;
        Total_AllTime_Minted += bopAmount;
        Total_Mint_Transactions += 1;
        bopReserve += bopAmount;
    }
    
    /**
     * @dev Swaps the wbopToken to BOP less the swap fee.
     */
    function swapWbop(uint256 wbopToken) external nonReentrant {
        require(bopToken.balanceOf(address(this)) >= (wbopToken - SWAP_FEE), "Not enough BOP in reserve");
        require(IERC20(address(wbopToken)).transferFrom(msg.sender, address(this), wbopToken), "Transfer of Wbop failed");
        require(bopToken.transfer(msg.sender, wbopToken - SWAP_FEE), "Transfer of BOP failed");
        bopReserve -= wbopToken;
        wbopReserve += wbopToken;
        feesCollected += SWAP_FEE;
        bopReserve += SWAP_FEE;
        Total_Wbop_Swap_Transactions += 1;
    }
 
      /**
     * @dev Swaps the BOP to WBOP plus the swap fee 0.01 BOP.
     */
    function swapBOP(uint256 bopAmount) external nonReentrant {
        require(bopToken.balanceOf(msg.sender) >= bopAmount + SWAP_FEE, "You need more BOP to Swap for Wbop Tokens SORRY!");
        require(bopToken.transferFrom(msg.sender, address(this), bopAmount + SWAP_FEE), "Transfer of BOP failed");
        wbopToken.transfer(msg.sender, bopAmount);
        bopReserve += bopAmount;
        bopReserve += SWAP_FEE;
        feesCollected += SWAP_FEE;
        wbopReserve -= bopAmount;
        Total_BOP_Swap_Transactions += 1;
    }

}
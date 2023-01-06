// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Vault.sol";
import {ERC721} from "../src/MockNFT.sol";

import {IERC20} from 'openzeppelin-contracts/token/ERC20/IERC20.sol';

import {RewardToken} from "../src/RewardToken.sol";


contract CounterTest is Test {
    Vault public vault;
    RewardToken public rewardToken;
    MockNFT public mockNFT;
    address user1 = mkaddr("user1");
    event balance (uint256 balance, address owner);

    function setUp() public {
        rewardToken = new RewardToken();
        mockNFT = new MockNFT();
        vault = new Vault(ERC721(mockNFT), IERC20(rewardToken));
    }

    function testStake() public {
        mockNFT.mint(1 ,address(user1) );
        mockNFT.mint(2 ,address(user1) );
        uint16[] memory id = new uint16[](2);
        id[0] = 1;
        id[1] = 2;
        vm.startPrank(address(user1));
        mockNFT.approve(address(vault), 1);
        mockNFT.approve(address(vault), 2);
        vault.stake(id);
        vm.warp(1674000000);
        vault.justClaim(id);
        uint256 _bal = rewardToken.balanceOf(address(user1));
        emit balance(_bal,address(user1));
        vault.claimAndUnstake(id);
        vm.stopPrank();  
    }
    //  1673019309
    //1673020103
    // -1674000000

   function mkaddr(string memory name) public returns (address) {
        address addr = address(uint160(uint256(keccak256(abi.encodePacked(name)))));
        vm.label(addr, name);
        return addr;
    }
}

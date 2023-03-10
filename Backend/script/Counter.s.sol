// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Vault.sol";
import "../src/MockNFT.sol";
import "../src/RewardToken.sol";
import "../src/deployVault.sol";
import {IERC721} from 'openzeppelin-contracts/token/ERC721/IERC721.sol';

import {IERC20} from 'openzeppelin-contracts/token/ERC20/IERC20.sol';

contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        MockNFT mockNFT = new MockNFT();
        RToken rewardToken  = new RToken();
        Deployer deployer = new Deployer();
        new Vault();
        vm.stopBroadcast();
    }
}

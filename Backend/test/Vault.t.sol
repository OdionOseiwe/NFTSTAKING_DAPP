// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Vault.sol";
import {ERC721} from "../src/MockNFT.sol";

import {IERC20} from 'openzeppelin-contracts/token/ERC20/IERC20.sol';

import {RToken} from "../src/RewardToken.sol";

import {Deployer} from "../src/deployVault.sol";


contract Vaulttest is Test {
    Vault public vault;
    RToken public rewardToken;
    MockNFT public mockNFT;
    Deployer public vaultDeployer;
    address user1 = mkaddr("user1");
    event balance (uint256 balance, address owner);

    function setUp() public {
        rewardToken = new RToken();
        mockNFT = new MockNFT();
        vaultDeployer = new Deployer();
        vault = new Vault(ERC721(mockNFT), IERC20(rewardToken), 5);
    }

    function testDeployerVault() public {
        vaultDeployer.deploy(address(mockNFT), address(rewardToken), 7, 'more');
        vaultDeployer.info();
    }

    function testGetAddress() view public {
        vaultDeployer.info();
    }

    // 
    function testStake() public {
        mockNFT.mint(1 ,address(user1) );
        mockNFT.mint(2 ,address(user1) );
        mockNFT.mint(3 ,address(user1) );
        rewardToken.mint(address(vault), 100000000000e18);
        uint16[] memory id = new uint16[](3);
        id[0] = 1;
        id[1] = 2;
        id[2] = 3;
        vm.startPrank(address(user1));
        mockNFT.approve(address(vault), 1);
        mockNFT.approve(address(vault), 2);
        mockNFT.approve(address(vault), 3);
        vault.stake(id);
        vm.warp(1677000000);
        vault.claim(id);
        uint256 _bal = rewardToken.balanceOf(address(user1));
        emit balance(_bal,address(user1));
        // vm.expectRevert(bytes('You recently staked, please wait before withdrawing'));
        // vault.claim(id);
        uint256 _bal2 = rewardToken.balanceOf(address(user1));
        vm.stopPrank();  
    }
  
    function testStake2() public {
        mockNFT.mint(1 ,address(user1) );
        mockNFT.mint(2 ,address(user1) );
        mockNFT.mint(3 ,address(user1) );
        rewardToken.mint(address(vault), 100000000000e18);
        uint16[] memory id = new uint16[](3);
        id[0] = 1;
        id[1] = 2;
        id[2] = 3;
        vm.startPrank(address(user1));
        mockNFT.approve(address(vault), 1);
        mockNFT.approve(address(vault), 2);
        mockNFT.approve(address(vault), 3);
        vault.stake(id);
        vm.warp(1677000000);
        vault.claim(id);
        uint256 _bal = rewardToken.balanceOf(address(user1));
        emit balance(_bal,address(user1));
        vm.warp(1679000000);
        vault.claim(id);
        rewardToken.balanceOf(address(user1));
        vm.stopPrank();  
    }
  
    event Info(uint256 info);
    function testInfo() public {
        mockNFT.mint(1 ,address(user1) );
        mockNFT.mint(2 ,address(user1) );
        rewardToken.mint(address(vault), 100000000000e18);
        uint16[] memory id = new uint16[](2);
        id[0] = 1;
        id[1] = 2;
        vm.startPrank(address(user1));
        mockNFT.approve(address(vault), 1);
        mockNFT.approve(address(vault), 2);
        vault.stake(id);
        vm.warp(1676000000);
        uint info = vault.earnedInfo(id);
        emit Info(info);
        vm.warp(1677000000);
        vault.claim(id);    
        vm.warp(1679000000);
        vault.unstake(id);
        rewardToken.balanceOf(address(user1));
        vm.stopPrank(); 
    }

   function mkaddr(string memory name) public returns (address) {
        address addr = address(uint160(uint256(keccak256(abi.encodePacked(name)))));
        vm.label(addr, name);
        return addr;
    }
}


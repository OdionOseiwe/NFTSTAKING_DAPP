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
    address user2 = mkaddr("user2");    
    event balance (uint256 balance, address owner);

    function setUp() public {
        rewardToken = new RToken();
        mockNFT = new MockNFT();
        vaultDeployer = new Deployer();
        vault = new Vault();
    }

    function testDeployerVault() public {
        vaultDeployer.deploy(address(mockNFT), address(rewardToken), 1, 'more', address(user1));
        vaultDeployer.info();
    }

    function testGetAddress() view public {
        vaultDeployer.info();
    }

    // 
    function testStake() public {
        address vault2 =  vaultDeployer.deploy(address(mockNFT), address(rewardToken), 1, 'more', address(user1));
        mockNFT.mint(2 ,address(user2) );
        rewardToken.mint(address(vault2), 100000000000e18);  
        vm.startPrank(address(user2));
        mockNFT.approve(address(vault2), 2);
        Ivault(vault2).stake(2);
        vm.warp(1677000000);
        Ivault(vault2).claim(2);
        uint256 _bal = rewardToken.balanceOf(address(user2));
        emit balance(_bal,address(user2));
        
        // vm.expectRevert(bytes('You recently staked, please wait before withdrawing'));
        // vault2.claim(id);
        rewardToken.balanceOf(address(user2));
        vm.stopPrank();  
    }
  
    function testpause() public {
        vm.startPrank(address(user1));
        address vault2 =  vaultDeployer.deploy(address(mockNFT), address(rewardToken), 1, 'more', address(user1));
        Ivault(vault2).pause();  
        Ivault(vault2).unpause();  
        vm.stopPrank();
    }

    function testwithdraw() public {
        vm.startPrank(address(user1));
        address vault2 =  vaultDeployer.deploy(address(mockNFT), address(rewardToken), 1, 'more', address(user1));
        rewardToken.mint(address(vault), 100000000000e18);  
        Ivault(vault2).withdrawTokens();  
        vm.stopPrank();
    }
  

    function testStake2() public {
        mockNFT.mint(1 ,address(user1) );
        mockNFT.mint(2 ,address(user1) );
        mockNFT.mint(3 ,address(user1) );
        address vault2 =  vaultDeployer.deploy(address(mockNFT), address(rewardToken), 1, 'more', address(user1));
        rewardToken.mint(address(vault2), 100000000000e18);
        vm.startPrank(address(user1));
        mockNFT.approve(address(vault2), 1);
        mockNFT.approve(address(vault2), 2);
        mockNFT.approve(address(vault2), 3);
        Ivault(vault2).stake(1);
        vm.warp(1677000000);
        Ivault(vault2).userIds();
        Ivault(vault2).claim(1);
        uint256 _bal = rewardToken.balanceOf(address(user1));
        emit balance(_bal,address(user1));
        vm.warp(1676500000);
        Ivault(vault2).claim(1);
        rewardToken.balanceOf(address(user1));
        vm.stopPrank();  
    }
  
    event Info(uint256 info);
    function testInfo() public {
        mockNFT.mint(1 ,address(user2) );
        mockNFT.mint(2 ,address(user1) );
        address vault2 =  vaultDeployer.deploy(address(mockNFT), address(rewardToken), 1, 'more', address(user1));
        rewardToken.mint(address(vault2), 100000000000e18);
        vm.startPrank(address(user2));
        mockNFT.approve(address(vault2), 1);
        Ivault(vault2).stake(1);
        vm.warp(1677000000);
        // uint info = Ivault(vault2).earnedInfo(1);
        // emit Info(info);
        vm.warp(1677000000);
        Ivault(vault2).claim(1);    
        vm.warp(1678000000);
        Ivault(vault2).unstake(1);
        rewardToken.balanceOf(address(user2));
        vm.stopPrank(); 
    }

   function mkaddr(string memory name) public returns (address) {
        address addr = address(uint160(uint256(keccak256(abi.encodePacked(name)))));
        vm.label(addr, name);
        return addr;
    }
}

interface Ivault {
    function stake(uint16 tokenid) external;
    function claim (uint16 tokenid) external;
    function unstake(uint16 tokenid) external;
    function withdrawTokens() external;
    function pause() external;
    function unpause() external;
    function earnedInfo(uint16 tokenid) external;
    function userIds() external returns(uint16[] memory);
}

//205432000000000000000000
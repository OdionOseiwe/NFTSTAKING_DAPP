// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Vault} from './Vault.sol';
import {IERC721} from 'openzeppelin-contracts/token/ERC721/IERC721.sol';

import {IERC20} from 'openzeppelin-contracts/token/ERC20/IERC20.sol';

contract Deployer {
    mapping(address => mapping(address => address))  vaults;
    mapping(uint256 => address)  AllVaults;
    uint256[] public numberOfVaults;
    uint256 counter;
    function deploy(
       address _nft, address _RToken , uint256 _index
    ) external returns (address vault) {  
        require(_nft != address(0), "address zero");
        require(_RToken != address(0), "address zero");
        require(_RToken != _nft, "the same address");
        require(vaults[_nft][_RToken] == address(0), "already a Vault");  
        vault = address(new Vault{salt: keccak256(abi.encode(_nft, _RToken))}(IERC721(_nft), IERC20(_RToken), _index));
        vaults[_nft][_RToken] = vault;
        vaults[_RToken][_nft] = vault;
        AllVaults[counter] = vault;
        numberOfVaults.push(counter);
        counter++;
    }

    function getAddress() external view returns(address[] memory allAddress){
        uint256 length = numberOfVaults.length;
        allAddress  = new address[](length);  
        for(uint i = 0; i < length; i++ ){
            allAddress[i] = AllVaults[numberOfVaults[i]]; 
        }
    }

}

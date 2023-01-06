// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Vault} from './Vault.sol';
import {IERC721} from 'openzeppelin-contracts/token/ERC721/IERC721.sol';

import {IERC20} from 'openzeppelin-contracts/token/ERC20/IERC20.sol';

contract Deployer {
    mapping(uint40 => address) public vaults;
    function deploy(
       address _nft, address _RToken
    ) external returns (address vault) {    
        vault = address(new Vault{salt: keccak256(abi.encode(_nft, _RToken))}(IERC721(_nft), IERC20(_RToken)));
    }
}

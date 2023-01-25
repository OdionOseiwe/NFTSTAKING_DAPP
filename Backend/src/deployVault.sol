// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Vault} from './Vault.sol';
import {IERC721} from 'openzeppelin-contracts/token/ERC721/IERC721.sol';

import {IERC20} from 'openzeppelin-contracts/token/ERC20/IERC20.sol';

contract Deployer {
    mapping(address => mapping(address => address))  vaults;
    struct VaultDe {
        string vaultName;
        address vaultAddress;
        uint256 vaultIndex;
    }
    mapping(uint256 => VaultDe)  AllVaults;
    uint256[] public numberOfVaults;
    uint256 counter;
    function deploy(
       address _nft, address _RToken , uint256 _rate, string memory _name, address newOwner
    ) external returns (address vault) {  
        require(_nft != address(0), "address zero");
        require(_RToken != address(0), "address zero");
        require(_RToken != _nft, "the same address");
        require(vaults[_nft][_RToken] == address(0), "already a Vault");
        bytes memory bytecode = type(Vault).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(_nft, _RToken));
        assembly {
            vault := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
        Ivault(vault).initialize(IERC721(_nft),IERC20(_RToken),_rate);
        vaults[_nft][_RToken] = vault;
        vaults[_RToken][_nft] = vault;
        AllVaults[counter].vaultName = _name;
        AllVaults[counter].vaultAddress = vault;
        AllVaults[counter].vaultIndex = _rate;
        numberOfVaults.push(counter);
        counter++;
        Ivault(vault).transferOwnership(newOwner);
    }

    function info() external view returns(VaultDe[] memory allAddress){
        uint256 length = numberOfVaults.length;
        allAddress  = new VaultDe[](length);  
        for(uint i = 0; i < length; i++ ){
            allAddress[i] = AllVaults[numberOfVaults[i]]; 
        }
    }


}

interface Ivault {
    function initialize(IERC721 _nft, IERC20 _token, uint256 _rate) external;
    function transferOwnership(address newOwner) external;
}

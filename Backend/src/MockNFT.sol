// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC721} from 'openzeppelin-contracts/token/ERC721/ERC721.sol';

contract MockNFT is ERC721("MockNFT", "MNFT") {
    function mint(uint256 tokenId , address to) external {
        _safeMint(to, tokenId);
    }

    function transfer(address from, uint256 tokenid, address to) external {
        _transfer(to, from, tokenid);
    }
}
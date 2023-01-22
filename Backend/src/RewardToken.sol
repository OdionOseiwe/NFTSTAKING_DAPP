// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {ERC20} from 'openzeppelin-contracts/token/ERC20/ERC20.sol';

contract RToken is ERC20('RewardToken', "RT") {
    function mint(address to, uint256 amount) override external{
        _mint(to, amount);
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC721} from 'openzeppelin-contracts/token/ERC721/IERC721.sol';

import {IERC20} from 'openzeppelin-contracts/token/ERC20/IERC20.sol';


import {RewardToken} from './RewardToken.sol';
import {MockNFT} from './MockNFT.sol';

contract Vault {
    address owner;
    IERC20 immutable public RToken;
    IERC721 immutable public NFT;
    uint256 numberOfStake;

    struct usersDetails{
        address owner;
        uint256 tokenId;
        uint256 blockTime;
    }

    /// @dev mapping of address to token id to details of the stake
    mapping(uint256 => usersDetails) public Details;

    mapping(address => mapping(uint256 => uint256)) public rewards;

    /// @dev tokenid to boolean to check if its been staked already 
    mapping(uint256 => bool) tokenIDstaked;

    //////////////////////////////////////////////////////EVENTS///////////////////////////////////////////////////////////////

    event staked(address staker, uint256 tokenid, uint256 time);
    event unstaked(address staker, uint256 tokenid);
    event claimed(address staker, uint256 tokenid, uint256 amount);
    event updateTime(address owner, uint256 newtime);

    constructor(IERC721 _nft, IERC20 _token) {
        NFT = _nft;
        RToken = _token;
    }

    /// @dev to help users save gas instead of calling the stake funtion multiple times to deposit NFTs
    /// @param tokenids is an array of token ids to stake
    function stake(uint16[] calldata tokenids) external {
        require(tokenids.length >= 1, "Vault: invalid Array");
        uint256 tokens_length = tokenids.length;
        numberOfStake += tokens_length;
        for (uint256 i = 0; i < tokens_length; i++) {
            usersDetails storage details = Details[tokenids[i]];
            details.owner = msg.sender;
            details.tokenId = tokenids[i];
            details.blockTime = block.timestamp;
            NFT.transferFrom(msg.sender, address(this), tokenids[i]);
            emit staked(msg.sender, tokenids[i], block.timestamp);
        }
    }

    function claim (uint16[] calldata tokenids) external {
        _claim(msg.sender,tokenids); 
        unstake(msg.sender,tokenids); 
    }

   

    function unstake(address _owner, uint16[] calldata tokenids) public {
        require(tokenids.length >= 1, "Vault: invalid Array");
        uint256 tokens_length = tokenids.length;
        numberOfStake += tokens_length;
        for (uint256 i = 0; i < tokens_length; i++) {
            delete Details[tokenids[i]];
            NFT.transferFrom(address(this), _owner,tokenids[i]);
            emit unstaked(_owner, tokenids[i]);        
        }
    }

    function earnedInfo(uint16[] calldata tokenids) public   returns(uint reward, uint16 id){
        require(tokenids.length >= 1, "Vault: invalid Array");
        uint256 tokens_length = tokenids.length;
        numberOfStake += tokens_length;
        for (uint256 i = 0; i < tokens_length; i++) {
            uint256 stakedAt = Details[tokenids[i]].blockTime ;
            uint256 earned = 10000e18 * (block.timestamp - stakedAt)/ 5 days;
            id = tokenids[i];
            reward = rewards[msg.sender][tokenids[i]] += earned / 10000;
        }        
    }

    function _claim(address _owner, uint16[] calldata tokenids) internal {
        (uint256 reward, uint16 id) = earnedInfo(tokenids);
        emit claimed(_owner,id, reward);
        Details[id].blockTime = block.timestamp;
        if(reward > 0){
            RToken.mint(_owner, reward);   
        }
    }
}

//193620000000000000000000000
//19374999988425925925925
//11342222222222222222
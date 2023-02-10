// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IERC721} from 'openzeppelin-contracts/token/ERC721/IERC721.sol';

import {IERC20} from 'openzeppelin-contracts/token/ERC20/IERC20.sol';
import {Pausable} from 'openzeppelin-contracts/security/Pausable.sol';
import {ReentrancyGuard} from 'openzeppelin-contracts/security/ReentrancyGuard.sol';
import {Ownable} from 'openzeppelin-contracts/access/Ownable.sol';
import "openzeppelin-contracts/utils/Address.sol";


import {RToken} from './RewardToken.sol';
import {MockNFT} from './MockNFT.sol';

contract Vault is Pausable,ReentrancyGuard, Ownable{
    address  public RewardToken;
    address  public StakeNFT;
    uint256 numberOfStake;
    uint256  public rate = 0 days;
    // unstaking possible after LOCKUP_TIME
    uint public LOCKUP_TIME = 1 minutes;
    using Address for address;
    address factory;
    struct usersDetails{
        address owner;
        uint256 tokenId;
        uint256 blockTime;
    }

    /// @dev mapping of token id to details of the stake
    mapping(uint256 => usersDetails) public Details;

    /// @dev mapping of address to an array of tokenID
    mapping(address => uint16[]) public UsersIDs;

    /// @dev tokenid to boolean to check if its been staked already 
    mapping(uint256 => bool) tokenIDstaked;

    //////////////////////////////////////////////////////EVENTS///////////////////////////////////////////////////////////////

    event staked(address staker, uint256 tokenid, uint256 time);
    event unstaked(address staker, uint256 tokenid);
    event claimed(address staker, uint16 tokenid, uint256 amount);
    event RateChanged(uint256 newRate);
    event LockTimeChanged(uint newLockTime);

    constructor()  {
        factory = msg.sender;
    }

    function initialize(address _nft, address _token, uint256 _rate) public {
        require(msg.sender == factory, 'Vault: FORBIDDEN'); 
        StakeNFT = _nft;
        RewardToken = _token;
        rate = _rate;
    }

    function pause() public onlyOwner() {
        _pause();
    }

    function unpause() public onlyOwner() {
        _unpause();
    }

    function setRate(uint256 _rate) public onlyOwner() {
       rate = _rate;
       emit RateChanged(rate);
    }

      //Set Lock Time
    function setLockTime(uint _lockTime) public onlyOwner() {
        LOCKUP_TIME = _lockTime;
        emit LockTimeChanged(LOCKUP_TIME);
    }

    modifier noContractsAllowed() {
        require(!(address(msg.sender).isContract()) && tx.origin == msg.sender, "No Contracts Allowed!");
        _;
    }

    function stake(uint16 tokenid) public whenNotPaused  nonReentrant(){
        IERC721(StakeNFT).transferFrom(msg.sender, address(this), tokenid);
        usersDetails storage details = Details[tokenid];
        details.owner = msg.sender;
        details.tokenId = tokenid;
        details.blockTime = block.timestamp;
        emit staked(msg.sender, tokenid, block.timestamp);
        numberOfStake += tokenid;
        UsersIDs[msg.sender].push(tokenid);
    }

    function unstake( uint16 tokenid) public{
        usersDetails memory details = Details[tokenid];
        require( msg.sender == details.owner, "not owner of stake");
        IERC721(StakeNFT).transferFrom(address(this), msg.sender,tokenid);
        emit unstaked(msg.sender, tokenid);       
        claim(tokenid); 
        numberOfStake -= tokenid;
        delete Details[tokenid];
    }

    function _earnedInfo(uint16 tokenid) public  view  returns(uint256 reward){
        usersDetails memory details = Details[tokenid];
        require( details.owner == msg.sender, "not owner of stake");   
        uint256 stakedAt = details.blockTime;
        reward = 1e18 * (block.timestamp - stakedAt)/ rate;
    }

    function userIds() external returns(uint16[] memory){
        return UsersIDs[msg.sender];
    }

    function claim(uint16 tokenid) public {
        usersDetails memory details = Details[tokenid];
        require( details.owner == msg.sender, "not owner of stake");       
        require(block.timestamp - Details[tokenid].blockTime > LOCKUP_TIME, "You recently staked, please wait before withdrawing.");
        uint256 stakedAt = details.blockTime;
        uint256 reward = (1e18 * (block.timestamp - stakedAt))/ rate ;
        details.blockTime= block.timestamp;
        reward = reward / 100000;
        emit claimed(msg.sender,tokenid, reward);
        if(reward > 0){
            require(IERC20(RewardToken).balanceOf(address(this)) > reward, "not enough rewards tokens");
            IERC20(RewardToken).transfer( msg.sender, reward);   
        }
    }

    // @dev withdraws the remaining rewardToken from the contracts
    function withdrawTokens() public onlyOwner {
        uint256 tokenSupply = IERC20(RewardToken).balanceOf(address(this));
        require(IERC20(RewardToken).transfer(msg.sender, tokenSupply), "Could not transfer Reward Token!");
    }
}

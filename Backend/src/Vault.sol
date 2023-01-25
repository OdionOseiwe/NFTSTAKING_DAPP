// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
// @dev A contract were you stake NFT and claim RewardToken depending on the rate the owner of the vault placed.
// @dev After staking An NFT you lock it for a period of 21 days then after 21days you can withdraw your nFT and RewardToken. Its only after 21dyas days you can claim


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
    uint public LOCKUP_TIME = 21 days;
    using Address for address;
    address factory;
    struct usersDetails{
        address owner;
        uint256 tokenId;
        uint256 blockTime;
    }

    /// @dev mapping of address to token id to details of the stake
    mapping(uint256 => usersDetails) public Details;

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

    function stake(uint16 tokenid) external whenNotPaused  nonReentrant(){
        IERC721(StakeNFT).transferFrom(msg.sender, address(this), tokenid);
        usersDetails storage details = Details[tokenid];
        details.owner = msg.sender;
        details.tokenId = tokenid;
        details.blockTime = block.timestamp;
        emit staked(msg.sender, tokenid, block.timestamp);
        numberOfStake += tokenid;
    }

    function _unstake( uint16 tokenid, address _owner) internal {
        require(Details[tokenid].owner == _owner, "not owner of stake");
        delete Details[tokenid];
        IERC721(StakeNFT).transferFrom(address(this), _owner,tokenid);
        emit unstaked(_owner, tokenid);       
        _claim(_owner,tokenid); 
        numberOfStake -= tokenid;
    }

    function unstake (uint16 tokenid) external whenNotPaused  nonReentrant() {
        _unstake(tokenid, msg.sender);
    }

    function _earnedInfo(uint16 tokenid, address _owner) internal view  returns(uint256 reward){
        require(Details[tokenid].owner == _owner, "not owner of stake");
        uint256 stakedAt = Details[tokenid].blockTime ;
        uint256 earned = 10000e18 * (block.timestamp - stakedAt)/ rate;
        reward += earned / 10000;
    }

    function earnedInfo(uint16 tokenid) view external returns(uint256 reward){
        reward = _earnedInfo(tokenid, msg.sender);
    }

    function _claim(address _owner, uint16 tokenid) internal {
        uint256 reward;
        require(Details[tokenid].owner == _owner, "not owner of stake");
        require(block.timestamp - Details[tokenid].blockTime > LOCKUP_TIME, "You recently staked, please wait before withdrawing.");
        uint256 stakedAt = Details[tokenid].blockTime ;
        uint256 earned = 10000e18 * (block.timestamp - stakedAt)/ rate ;
        Details[tokenid].blockTime = block.timestamp;
        reward += earned / 10000;
        emit claimed(_owner,tokenid, reward);
        if(reward > 0){
            require(IERC20(RewardToken).balanceOf(address(this)) > reward, "not enough rewards tokens");
            IERC20(RewardToken).transfer( _owner, reward);   
        }
    }

    function claim (uint16 tokenid) external whenNotPaused  nonReentrant() {
        _claim(msg.sender,tokenid); 
    }

    // 
    // function emergencyWithdraw(uint256[] calldata tokenIds) external noContractsAllowed nonReentrant() {
    //     if(block.timestamp - Details[tokenIds[i]].blockTime < LOCKUP_TIME){

    //     }
    // }

    // @dev withdraws the remaining rewardToken from the contracts
    function withdrawTokens() external onlyOwner {
        uint256 tokenSupply = IERC20(RewardToken).balanceOf(address(this));
        require(IERC20(RewardToken).transfer(msg.sender, tokenSupply), "Could not transfer Reward Token!");
    }

}
pragma solidity ^0.5.0;

//...............................................................................................................................................................................
//................OOOOOO............................................OOOOOO....................SSSSSS.............................OOOOOO..........................................
//.PPPPPPPPPP....OOOOOOOOO...OPPPPPPPPP..PUUU...UUUU..ULLL.........OOOOOOOOO...OUUU...UUUU...SSSSSSSS....... WW..WWWWW..WWWW...OOOOOOOOO...ORRRRRRRRR....RLLL.......DDDDDDDDD....
//.PPPPPPPPPP...OOOOOOOOOO...OPPPPPPPPP..PUUU...UUUU..ULLL........OOOOOOOOOO...OUUU...UUUU..USSSSSSSSS...... WW..WWWWW..WWWW..OOOOOOOOOO...ORRRRRRRRRR...RLLL.......DDDDDDDDDDD..
//.PPPPPPPPPPP.POOOOOOOOOOO..OPPPPPPPPPP.PUUU...UUUU..ULLL.......LOOOOOOOOOOO..OUUU...UUUU..USSSSSSSSS...... WW..WWWWW..WWWW.WOOOOOOOOOOO..ORRRRRRRRRR...RLLL.......DDDDDDDDDDD..
//.PPPP...PPPP.POOO....OOOO..OPPP...PPPP.PUUU...UUUU..ULLL.......LOOO....OOOO..OUUU...UUUU.UUSS...SSSSS...... WWW.WWWWW.WWWW..WOOO....OOOO..ORRR...RRRR..RLLL.......DDDD...DDDD..
//.PPPP...PPPP.POOO....OOOOO.OPPP...PPPP.PUUU...UUUU..ULLL.......LOOO....OOOOO.OUUU...UUUU.UUSSSS............ WWWWWWWWWWWWWW..WOOO....OOOOO.ORRR...RRRRR.RLLL.......DDDD....DDD..
//.PPPPPPPPPPP.PPOO.....OOOO.OPPPPPPPPPP.PUUU...UUUU..ULLL......LLOO......OOOO.OUUU...UUUU..USSSSSSSS........ WWWWWWWWWWWWWW.WWOO......OOOO.ORRRRRRRRRR..RLLL.......DDDD....DDD..
//.PPPPPPPPPPP.POO......OOOO.OPPPPPPPPPP.PUUU...UUUU..ULLL......LLOO......OOOO.OUUU...UUUU..USSSSSSSSS....... WWWWWWWWWWWWWW.WWOO......OOOO.ORRRRRRRRRR..RLLL.......DDDD....DDD..
//.PPPPPPPPPP..POO......OOOO.OPPPPPPPPP..PUUU...UUUU..ULLL......LLOO......OOOO.OUUU...UUUU....SSSSSSSSS.......WWWWWW.WWWWWW..WWOO......OOOO.ORRRRRRRRRR..RLLL.......DDDD....DDD..
//.PPPPPPPPP...POOO....OOOOO.OPPPPPPPP...PUUU...UUUU..ULLL.......LOOO....OOOOO.OUUU...UUUU.UUSS..SSSSSS.......WWWWWW.WWWWWW...WOOO....OOOOO.ORRR..RRRRR..RLLL.......DDDD...DDDD..
//.PPPP........POOO....OOOO..OPPP........PUUU...UUUU..ULLL.......LOOO....OOOO..OUUU...UUUU.UUSS....SSSS.......WWWWWW.WWWWWW...WOOO....OOOO..ORRR...RRRR..RLLL.......DDDD...DDDD..
//.PPPP........POOOOOOOOOOO..OPPP........PUUUUUUUUUU..ULLLLLLLLL.LOOOOOOOOOOO..OUUUUUUUUUU.UUSSSSSSSSSS........WWWWW.WWWWW....WOOOOOOOOOOO..ORRR...RRRR..RLLLLLLLLL.DDDDDDDDDDD..
//.PPPP.........OOOOOOOOOO...OPPP........PUUUUUUUUUU..ULLLLLLLLL..OOOOOOOOOO...OUUUUUUUUUU..USSSSSSSSS.........WWWW...WWWW.....OOOOOOOOOO...ORRR...RRRR..RLLLLLLLLL.DDDDDDDDDD...
//.PPPP..........OOOOOOOOO...OPPP.........UUUUUUUUU...ULLLLLLLLL...OOOOOOOOO....UUUUUUUUU....SSSSSSSSS.........WWWW...WWWW......OOOOOOOOO...ORRR...RRRRR.RLLLLLLLLL.DDDDDDDDD....
//................OOOOOO....................UUUUU...................OOOOOO........UUUUU.......SSSSSS.............................OOOOOO..........................................
//...............................................................................................................................................................................

/**
 * Populous XBRL Token reward contract author Populous World
 **/
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "../libraries/openzeppelin-upgradeability/InitializableAdminUpgradeabilityProxy.sol";

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "../lendingpool/LendingPoolCore.sol";

import "../tokenization/PToken.sol";


contract PopulousReward is Ownable  {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount;     // How many A tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
    }

    // Info of each pool.
    struct PoolInfo {
        IERC20 PToken;
        uint256 allocPoint;       // How many allocation points assigned to this pool. Tokens to distribute per block.
        uint256 lastRewardBlock;  // Last block number that Token distribution occurs.
        uint256 accTokenPerShare; // Accumulated Token per share, times 1e12. See below.
    }

    // The Erc20 Token
    RewardToken public rewardToken;
    // Dev address.
    address public devaddr;
    // Block number when bonus Token period ends.
    uint256 public bonusEndBlock;
    // Reward tokens created per block.
    uint256 public rewardTokenPerBlock;
    // Bonus muliplier for early token makers.
    uint256 public constant BONUS_MULTIPLIER = 10;
    // The migrator contract. It has a lot of power. Can only be set through owner.
    IMigratorToken public migrator;
    
    // Info of each pool.
    mapping(address => PoolInfo) internal poolInfo;
    // Info of each user that stakes A tokens.
    mapping(address => mapping(address => UserInfo)) internal userInfo;
    // Total allocation poitns. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;
    // The block number when Token mining starts.
    uint256 public startBlock;
    
    LendingPoolCore public core;

    event Deposit(address indexed user, address indexed _reserve, uint256 amount);
    event Withdraw(address indexed user,address indexed _reserve, uint256 amount);
    event Withdrawrawrewardtoken(address indexed user,address indexed _reserve);
    event EmergencyWithdraw(address indexed user, address indexed _reserve, uint256 amount);

    constructor(
        LendingPoolCore _core,
        RewardToken _rewardToken,
        address _devaddr,
        uint256 _rewardTokenPerBlock,
        uint256 _startBlock,
        uint256 _bonusEndBlock
    ) public {
        core = _core;
        rewardToken = _rewardToken;
        devaddr = _devaddr;
        rewardTokenPerBlock = _rewardTokenPerBlock;
        bonusEndBlock = _bonusEndBlock;
        startBlock = _startBlock;
    }
    
    function UpdatelendingPoolCore(LendingPoolCore _lendingPoolCore) public onlyOwner()
    {
        require(address(_lendingPoolCore) != address(0), "LendingPoolCore: new Core contract  is the zero address");
        core=_lendingPoolCore;
    }
    
    // Add a new PToken to the pool. Can only be called by the owner.
    // XXX DO NOT add the same A token more than once. Rewards will be messed up if you do.
    function add(uint256 _allocPoint, address _reserve) public onlyOwner {
        
        PToken PToken = PToken(core.getReservePTokenAddress(_reserve));
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        
        PoolInfo storage pool = poolInfo[_reserve];
        pool.PToken=PToken;
        pool.allocPoint= _allocPoint;
        pool.lastRewardBlock= lastRewardBlock;
        pool.accTokenPerShare= 0;
    }

    // Update the given pool's Token allocation point. Can only be called by the owner.
    function set(address _reserve, uint256 _allocPoint) public onlyOwner {
        
        totalAllocPoint = totalAllocPoint.sub(poolInfo[_reserve].allocPoint).add(_allocPoint);
        poolInfo[_reserve].allocPoint = _allocPoint;
    }
    
    // Set the migrator contract. Can only be called by the owner.
    function setMigrator(IMigratorToken _migrator) public onlyOwner {
        migrator = _migrator;
    }

    // Migrate lp token to another lp contract. Can be called by anyone. We trust that migrator contract is good.
    function migrate(address _reserve) public {
        require(address(migrator) != address(0), "migrate: no migrator");
        PoolInfo storage pool = poolInfo[_reserve];
        IERC20 PToken = pool.PToken;
        uint256 bal = PToken.balanceOf(address(this));
        PToken.safeApprove(address(migrator), bal);
        IERC20 newPToken = migrator.migrate(PToken);
        require(bal == newPToken.balanceOf(address(this)), "migrate: bad");
        pool.PToken = PToken;
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public view returns (uint256) {
        if (_to <= bonusEndBlock) {
            return _to.sub(_from).mul(BONUS_MULTIPLIER);
        } else if (_from >= bonusEndBlock) {
            return _to.sub(_from);
        } else {
            return bonusEndBlock.sub(_from).mul(BONUS_MULTIPLIER).add(
                _to.sub(bonusEndBlock)
            );
        }
    }

    // View function to see pending rewardTokens on frontend.
    function pendingrewardToken(address _reserve, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_reserve];
        UserInfo storage user = userInfo[_reserve][_user];
        uint256 accTokenPerShare = pool.accTokenPerShare;
        uint256 PTokenSupply = pool.PToken.balanceOf(msg.sender);
        if (block.number > pool.lastRewardBlock && PTokenSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 rewardTokenReward = multiplier.mul(rewardTokenPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
            accTokenPerShare = accTokenPerShare.add(rewardTokenReward.mul(1e12).div(PTokenSupply));
        }
        return user.amount.mul(accTokenPerShare).div(1e12).sub(user.rewardDebt);
    }
    
    function getpoolinfo(address _reserve) public view returns(IERC20 ,uint256 ,uint256,uint256 ){
        PoolInfo storage pool = poolInfo[_reserve];
        return(pool.PToken,pool.allocPoint,pool.lastRewardBlock,pool.accTokenPerShare);

    }
    
    function getuserinfo(address _reserve, address _user) public view returns(uint256 ,uint256 ){
        UserInfo storage user = userInfo[_reserve][_user];
        return(user.amount,user.rewardDebt);
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(address _reserve) public {
        PoolInfo storage pool = poolInfo[_reserve];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.PToken.balanceOf(msg.sender);
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 rewardTokenReward = multiplier.mul(rewardTokenPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
        rewardToken.mint(devaddr, rewardTokenReward.div(10));
        rewardToken.mint(address(this), rewardTokenReward);
        pool.accTokenPerShare = pool.accTokenPerShare.add(rewardTokenReward.mul(1e12).div(lpSupply));
        pool.lastRewardBlock = block.number;
    }

    // Deposit LP tokens to MasterChef for rewardToken allocation.
    function deposit(address _reserve, uint256 _amount) public {
        PoolInfo storage pool = poolInfo[_reserve];
        UserInfo storage user = userInfo[_reserve][msg.sender];
        updatePool(_reserve);
        if (user.amount > 0) {
            uint256 pending = user.amount.mul(pool.accTokenPerShare).div(1e12).sub(user.rewardDebt);
            saferewardTokenTransfer(msg.sender, pending);
        }
        //pool.PToken.safeTransferFrom(address(msg.sender), address(this), _amount);
        user.amount = user.amount.add(_amount);
        user.rewardDebt = user.amount.mul(pool.accTokenPerShare).div(1e12);
        emit Deposit(msg.sender, _reserve, _amount);
    }

    // Withdraw LP tokens from MasterChef.
    function withdraw(address _reserve, uint256 _amount) public {
        PoolInfo storage pool = poolInfo[_reserve];
        UserInfo storage user = userInfo[_reserve][msg.sender];
        //require(user.amount >= _amount, "withdraw: not good");
        updatePool(_reserve);
        uint256 pending = user.amount.mul(pool.accTokenPerShare).div(1e12).sub(user.rewardDebt);
        saferewardTokenTransfer(msg.sender, pending);
        user.amount = user.amount.sub(_amount);
        user.rewardDebt = user.amount.mul(pool.accTokenPerShare).div(1e12);
        //pool.PToken.safeTransfer(address(msg.sender), _amount);
        emit Withdraw(msg.sender, _reserve, _amount);
    }
    
    // Withdraw only reward token
    function withdrawrewardtoken(address _reserve) public {
        PoolInfo storage pool = poolInfo[_reserve];
        UserInfo storage user = userInfo[_reserve][msg.sender];
        updatePool(_reserve);
        uint256 pending = user.amount.mul(pool.accTokenPerShare).div(1e12).sub(user.rewardDebt);
        saferewardTokenTransfer(msg.sender, pending);
        
        emit Withdrawrawrewardtoken(msg.sender, _reserve);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(address _reserve) public {
        //PoolInfo storage pool = poolInfo[_reserve];
        UserInfo storage user = userInfo[_reserve][msg.sender];
        //pool.PToken.safeTransfer(address(msg.sender), user.amount);
        emit EmergencyWithdraw(msg.sender, _reserve, user.amount);
        user.amount = 0;
        user.rewardDebt = 0;
    }

    // Safe rewardToken transfer function, just in case if rounding error causes pool to not have enough rewardTokens.
    function saferewardTokenTransfer(address _to, uint256 _amount) internal {
        uint256 rewardTokenBal = rewardToken.balanceOf(address(this));
        if (_amount > rewardTokenBal) {
            rewardToken.transfer(_to, rewardTokenBal);
        } else {
            rewardToken.transfer(_to, _amount);
        }
    }
}

contract RewardToken is ERC20, Ownable {
    /// @notice Creates `_amount` token to `_to`. Must only be called by the owner (MasterChef).
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }
}
    
interface IMigratorToken {
    // Perform LP token migration from legacy UniswapV2 to rewardTokenSwap.
    // Take the current LP token address and return the new LP token address.
    // Migrator should have full access to the caller's LP token.
    // Return the new LP token address.
    //
    // XXX Migrator must have allowance access to UniswapV2 LP tokens.
    // rewardTokenSwap must mint EXACTLY the same amount of rewardTokenSwap LP tokens or
    // else something bad will happen. Traditional UniswapV2 does not
    // do that so be careful!
    function migrate(IERC20 token) external returns (IERC20);
}
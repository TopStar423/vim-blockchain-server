// ABI
const tierAbi = [
    {
      inputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'vimId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Deposit',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'vimId',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'newTier',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'upgradeFee',
          type: 'uint256',
        },
      ],
      name: 'ImmediateUpgrade',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransfer',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'vimId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Withdraw',
      type: 'event',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: '_tier',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_newUpgradeRequirement',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_newDailyMax',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_newImmediateUpgradeCost',
          type: 'uint256',
        },
      ],
      name: 'changeTierData',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'eggContract',
      outputs: [
        {
          internalType: 'contract EggOwnership',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'ehrtContract',
      outputs: [
        {
          internalType: 'contract VIP180',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: '_vimId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'feed',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '_vimId',
          type: 'uint256',
        },
      ],
      name: 'getFeedAllowance',
      outputs: [
        {
          internalType: 'uint256',
          name: '_lastDayFed',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_feedAllowance',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '_tier',
          type: 'uint256',
        },
      ],
      name: 'getTierData',
      outputs: [
        {
          internalType: 'uint256',
          name: '_upgradeRequirement',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_dailyMaximum',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_immediateUpgradeCost',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '_fedAmount',
          type: 'uint256',
        },
      ],
      name: 'getTierOfAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '_tier',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '_vimId',
          type: 'uint256',
        },
      ],
      name: 'getTierOfVim',
      outputs: [
        {
          internalType: 'uint256',
          name: '_currentTier',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '_vimId',
          type: 'uint256',
        },
      ],
      name: 'getTotalFed',
      outputs: [
        {
          internalType: 'uint256',
          name: '_totalFed',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: '_vimId',
          type: 'uint256',
        },
      ],
      name: 'immediateUpgrade',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'lockContract',
      outputs: [
        {
          internalType: 'contract LockedTokenManager',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_lockAddress',
          type: 'address',
        },
      ],
      name: 'setLockContract',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: '_burn',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_lock',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_transferLock',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_lockMonths',
          type: 'uint256',
        },
      ],
      name: 'setTransferSettings',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'transferSettings',
      outputs: [
        {
          internalType: 'uint256',
          name: 'burnedPercent',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'lockedPercent',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'transferLockedPercent',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'lockedMonths',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_contractAddress',
          type: 'address',
        },
      ],
      name: 'updateEggContract',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_contractAddress',
          type: 'address',
        },
      ],
      name: 'updateEhrtContract',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_address',
          type: 'address',
        },
      ],
      name: 'updateFeeCollectorAddress',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: '_contractAddress',
          type: 'address',
        },
      ],
      name: 'updateVimContract',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'vimContract',
      outputs: [
        {
          internalType: 'contract VimOwnership',
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'uint256',
          name: '_vimId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'withdraw',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ]
  
  export const abi_tier: Record<string, any> = tierAbi.reduce(
    (r, d) => ({ ...r, [d.name]: d }),
    {}
  )
  
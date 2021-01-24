export const vimsOfOwner = {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "tokensOfOwner",
    outputs: [
      {
        name: "",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  };
  
  export const balanceOfEHRT = {
    constant: true,
    inputs: [
      {
        name: "_tokenOwner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  };
  
  export const abi_vim = {
    approvalForAll: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: '_owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: '_operator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: '_approved',
          type: 'bool',
        },
      ],
      name: 'ApprovalForAll',
      type: 'event',
    },
    isApprovedForAll: {
      constant: true,
      inputs: [
        {
          name: '_owner',
          type: 'address',
        },
        {
          name: '_operator',
          type: 'address',
        },
      ],
      name: 'isApprovedForAll',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    ownerOf: {
      constant: true,
      inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
      name: 'ownerOf',
      outputs: [
        { internalType: 'address payable', name: '_owner', type: 'address' },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    setApprovalForAll: {
      constant: false,
      inputs: [
        {
          name: '_operator',
          type: 'address',
        },
        {
          name: '_approved',
          type: 'bool',
        },
      ],
      name: 'setApprovalForAll',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    approve: {
      constant: false,
      inputs: [
        {
          name: '_approved',
          type: 'address',
        },
        {
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  
    getVim: {
      constant: true,
      inputs: [
        {
          name: '_uid',
          type: 'uint256',
        },
      ],
      name: 'getVim',
      outputs: [
        {
          internalType: 'address',
          name: '_owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '_timestamp',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    tokensOfOwner: {
      constant: true,
      inputs: [
        {
          name: '_owner',
          type: 'address',
        },
      ],
      name: 'tokensOfOwner',
      outputs: [
        {
          name: '',
          type: 'uint256[]',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  
    tokenURI: {
      constant: true,
      inputs: [
        {
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'tokenURI',
      outputs: [
        {
          name: '',
          type: 'string',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    safeTransferFrom: {
      constant: false,
      inputs: [
        {
          name: '_from',
          type: 'address',
        },
        {
          name: '_to',
          type: 'address',
        },
        {
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'safeTransferFrom',
      outputs: [],
      payable: true,
      stateMutability: 'payable',
      type: 'function',
    },
    Transfer: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: '_from',
          type: 'address',
        },
        {
          indexed: true,
          name: '_to',
          type: 'address',
        },
        {
          indexed: true,
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    getApproved: {
      constant: true,
      inputs: [
        {
          name: '_tokenId',
          type: 'uint256',
        },
      ],
      name: 'getApproved',
      outputs: [
        {
          name: '',
          type: 'address',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    totalSupply: {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    vimArray: {
      constant: true,
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'vimArray',
      outputs: [
        {
          internalType: 'address payable',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'tokenId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
  }
  
export const exchange = [
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_vimId", type: "uint256" },
      { indexed: false, name: "_price", type: "uint256" },
    ],
    name: "List",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_from", type: "address" },
      { indexed: true, name: "_to", type: "address" },
      { indexed: true, name: "_vimId", type: "uint256" },
      { indexed: false, name: "_price", type: "uint256" },
    ],
    name: "Bought",
    type: "event",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "_vimId",
        type: "uint256",
      },
    ],
    name: "getListedPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "_listedPrice",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

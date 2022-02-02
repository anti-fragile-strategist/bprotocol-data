const networks = [
  {
    name: "arbitrum",
    scanner: "arbiscan.io",
    bamms: [
      {
        platform: "hundred",
        name: "hundred",
        address: "0x04208f296039f482810B550ae0d68c3E1A5EB719"
      },
    ]
  },
  {
    name: "fantom",
    scanner: "ftmscan.com",
    bamms: [
      {
        platform: "hundred",
        name: "hundred",
        address: "0x6d62d6af9b82cdfa3a7d16601ddbcf8970634d22"
      },
    ]
  }
]

module.exports = networks
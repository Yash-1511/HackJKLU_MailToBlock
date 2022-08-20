require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",
  networks: {
    polygon: {
      url: process.env.ALCHEMY_POLYGON,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  paths: {
    artifacts: "../front/src/Utils"
  },
};

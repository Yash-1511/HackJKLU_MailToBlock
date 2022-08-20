const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const MailToBlock = await hre.ethers.getContractFactory("MailToBlock");
  const mailToBlock = await MailToBlock.deploy();

  await mailToBlock.deployed();

  console.log("MailToBlock is deployed to:", mailToBlock.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
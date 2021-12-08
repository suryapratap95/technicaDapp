const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main (){


        const Votercontract = await hre.ethers.getContractFactory("Greeter");
        const votercontract = await Votercontract.deploy("Hello, Hardhat!");
      
        await votercontract.deployed();
      
        console.log("Voter Contract deployed to:", votercontract.address);
}

main()
.then(()=> process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1)
});
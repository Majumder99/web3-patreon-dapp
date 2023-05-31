const hre = require("hardhat");
async function main() {
  // Get the ContractFactories and Signers here.
  const Sourav = await hre.ethers.getContractFactory("Sourav");
  // deploy contracts
  const sourav = await Sourav.deploy();
  await sourav.deployed();
  console.log("Contract address sourav", sourav.address);
  // Save copies of each contracts abi and address to the frontend.
  // saveFrontendFiles(sourav, "Sourav");
}

function saveFrontendFiles(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  const contractArtifact = hre.artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

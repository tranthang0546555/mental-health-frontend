// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
// import { expect } from "chai";
// import { ethers } from "hardhat";

// describe("MedicalRecord", function () {
//   async function deploy() {
//     const [owner, otherAccount] = await ethers.getSigners();
//     const MedicalRecord = await ethers.getContractFactory("MedicalRecord");
//     const contract = await MedicalRecord.deploy();

//     return { contract, owner, otherAccount };
//   }

//   describe("Create", function () {
//     it("Create record", async function () {
//       const { contract, owner, otherAccount } = await deploy();
//       const data = '{name: "Thang", age: "22"}';
//       await expect(await contract.createRecord(data))
//         .to.emit(contract, "CreateRecord")
//         .withArgs(data, anyValue);
//     });

//     it("Get all", async function () {
//       const { contract, owner, otherAccount } = await deploy();
//       const records = await contract.getAll();
//       console.log("records", records);
//       //   expect(records.length).to.equal(1);
//       expect(records).to.equal([]);
//     });
//   });
// });

import { ethers } from 'ethers';
import MedicalRecord from './MedicalRecord.json';

export const BlockChainError = {
  NOT_INSTALL: 1,
  CHAINID_WRONG: 2,
  NOT_LOGIN: 3
};

export const MedicalRecordContract = async () => {
  try {
    const { ethereum } = window;
    if (!ethereum) return BlockChainError.NOT_INSTALL;
    const provider = new ethers.providers.Web3Provider(ethereum);

    const chainId = await ethereum.request({ method: 'eth_chainId' });
    // console.log("Connected to chainId", chainId);

    const goerliChainId = '0x5';
    if (chainId !== goerliChainId) {
      console.log('ChainId wrong');
      return BlockChainError.CHAINID_WRONG;
    }

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts'
    });
    // console.log("Account", accounts[0]);

    if (!accounts[0]) return 3;

    const signer = provider.getSigner();

    const MedicalRecordContract = new ethers.Contract(
      // process.env.CONTRACT_ADDRESS,
      '0x96Be97aCb5e029233E22A02830B0aB513812D301',
      MedicalRecord.abi,
      signer
    );
    return MedicalRecordContract;
  } catch (error) {
    console.log('Connect error', error);
  }
};
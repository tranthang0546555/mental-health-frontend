import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MedicalRecord from "./MedicalRecord.json";

export default function useContract() {
  const [contract, setContract] = useState<ethers.Contract>();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const { ethereum } = window;
      console.log(ethereum);
      if (!ethereum) return toast.error("Chưa cài đặt ví Metamask");
      const provider = new (ethers as any).providers.Web3Provider(ethereum);

      const chainId = await ethereum.request({ method: "eth_chainId" });

      const goerliChainId = "0x5";
      if (chainId !== goerliChainId) {
        console.log("ChainId wrong");
        return toast.warn("Mạng thử nghiệm Goerly chưa được chọn");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts[0])
        return toast.warn("Bạn cần đăng nhập ví Metamask để tiếp tục");

      const signer = provider.getSigner();

      const MedicalRecordContract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        MedicalRecord.abi,
        signer
      );
      setContract(MedicalRecordContract);
    } catch (error) {
      console.log("Connect error", error);
    }
  };

  const funcs = contract && {
    getMedicalRecord: async (id: number) => await contract.getMedicalRecord(id),
    getRecordsbyDoctorId: async (doctorId: string) =>
      await contract.getRecordsbyDoctorId(doctorId),
    createMedicalRecord: (data: string, userId: string, doctorId: string) =>
      contract.createMedicalRecord(data, userId, doctorId),
    getRecordsbyUserId: (id: string) => contract.getRecordsbyUserId(id),
  };

  return funcs;
}
